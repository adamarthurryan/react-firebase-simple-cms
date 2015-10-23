import {fb, FBUserWatcher, FBObjectWatcher} from "../firebase"
import React from "react"
import {Location, Locations, Link} from "react-router-component"

import Navbar from "./Navbar"
import List from "./List"
import Login from "./Login"

import NewItem from "./edit/NewItem"
import EditItem from "./edit/EditItem"
import ViewItem from "./view/ViewItem"

const defaultSettings = {site: {name: "Serverless CMS"}};

export default class App extends React.Component {  

  //set initial state
  constructor() {
    super();
    this.fbUserWatcher = new FBUserWatcher();
    this.fbSettingsWatcher = new FBObjectWatcher(fb().child("setting"));
    this.state = {settings: defaultSettings};
  }

  componentWillMount() {
    this.fbUserWatcher.on(user => this.setState({user}));
    
    //load app specific info
    this.fbSettingsWatcher.on(this.updateSettings);    
  }

  componentWillUnmount() {
    this.fbUserWatcher.off();
    this.fbSettingsWatcher.off();
  }

  updateSettings = settings => {
    //only update settings if they were found in the db
    //otherwise use default settings
    if (settings)
      this.setState({settings});
    else
      this.setState({settings:defaultSettings});
  }


  render () {
    return <div>
      <header>
        {this.renderHeader()}
      </header>

      <div id="app" className="row">
        <Locations>
          <Location path="/" handler={List} type="page" user={this.state.user} settings={this.state.settings} />
          <Location path="/login" handler={Login} user={this.state.user} settings={this.state.settings} />
          <Location path="/:type/list" handler={List} user={this.state.user} settings={this.state.settings} />
          <Location path="/:type/new" handler={NewItem} user={this.state.user} settings={this.state.settings} />
          <Location path="/:type/:id/edit" handler={EditItem} user={this.state.user} settings={this.state.settings} />
          <Location path="/:type/:id" handler={ViewItem} user={this.state.user} settings={this.state.settings} />
        </Locations>
      </div>
      <footer className="row">
        <p className="text-right"><em>Simple serverless CMS with React and Firebase.</em></p>
      </footer>
    </div>
  }

  renderHeader() {
    //if(this.state.user)
      return <Navbar location={this.props.location} params={this.props.params} user={this.state.user} settings={this.state.settings}/>
    //else 
    /*  return <div className="right">
        <Link to="/login" className="button">Login</Link>
        <Link to="/signup" className="button">SignUp</Link>
        <a data-dropdown="drop2" aria-controls="drop2" aria-expanded="false">Login</a>
        <div id="drop2" data-dropdown-content className="f-dropdown content" aria-hidden="true" tabIndex="-1">
          <Login/>
        </div>
      </div>
    */
  }
} 