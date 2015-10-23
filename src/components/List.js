import {fb, FBSetWatcher} from "../firebase"
import React from "react"
import {Location, Locations, Link} from "react-router-component"
import Message from "./Message"


import Empty from "./Empty"
import NewItem from "./edit/NewItem"
import EditItem from "./edit/EditItem"
import ViewItem from "./view/ViewItem"

export default class List extends React.Component {

  componentWillMount() {
    this.state = {};
    this.pages = [];


    //create the listeners for this page in firebase
    //!!! for some reason the items don't stay in the right order
    //a problem here or in the FBSetWatcher
    this.itemsWatcher = new FBSetWatcher(fb().child(this.props.type).orderByChild('name'));
    this.itemsWatcher.on(items => this.setState({items}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemsWatcher.off();
    this.itemsWatcher = new FBSetWatcher(fb().child(nextProps.type).orderByChild('name'));
    this.itemsWatcher.on(items => this.setState({items}));
  }

  componentWillUnmount() {
    this.itemsWatcher.off();
  }

  render() {

    if (!this.state.items) {
      return <Message message="Loading..."/>
    }

    var itemLinks =[]; 
    for (var [key, item] of this.state.items) {
      itemLinks.push(this.renderItem(key, item))
    }


    return <div className = "row">
      <div id="sidebar" className="large-3 columns">
        <h1>{this.props.type}</h1>
        <ul className="side-nav">
          {itemLinks}
        </ul>
      </div>
      <div id="content" className="large-9 columns">
        <Locations contextual>
          <Location path="/" handler={Empty} />
          <Location path="/new" handler={NewItem} {...this.props}/>
          <Location path="/:id/edit" handler={EditItem} {...this.props}/>
          <Location path="/:id" handler={ViewItem} {...this.props}/>
        </Locations>
      </div>
    </div>
  }

  renderItem(key, item) {
    //!!! Where does type get found / passed
    var targetUrl = `/${this.props.type}/${key}`
    return <li key={key} ><Link global href={targetUrl} activeClassName="active">{item.name}</Link></li>
  }

 
}