import {FBUserWatcher} from "../firebase"
import React from "react"
import {Link} from "react-router"

import Navbar from "./Navbar.js"
import List from "./List.js"

export default class App extends React.Component {

  //set initial state
  constructor() {
    super();
    this.fbUserWatcher = new FBUserWatcher();
  }

  componentWillMount() {
    this.fbUserWatcher.on(user => this.setState({user}));
  }

  componentWillUnmount() {
    this.fbUserWatcher.off();
  }



  render () {
    return <div>
      <header>
        <Navbar location={this.props.location} params={this.props.params} user={this.state.user}/>
      </header>

      <div id="app" className="row">
        { (this.props.children) ? 
          React.cloneElement(this.props.children, {user: this.state.user}) 
          : null }
      </div>
      <footer className="row">
        <p className="text-right"><em>Simple serverless CMS with React and Firebase.</em></p>
      </footer>
    </div>
  }
} 