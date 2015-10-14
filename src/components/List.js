import {fb, FBSetWatcher} from "../firebase"
import React from "react"
import {Link} from "react-router"


export default class List extends React.Component {

  componentWillMount() {
    this.state = {};
    this.pages = [];


    //create the listeners for this page in firebase
    this.itemsWatcher = new FBSetWatcher(fb().child(this.props.params.type));
    this.itemsWatcher.on(items => this.setState({items}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemsWatcher.off();
    this.itemsWatcher = new FBSetWatcher(fb().child(nextProps.params.type));
    this.itemsWatcher.on(items => this.setState({items}));
  }

  componentWillUnmount() {
    this.itemsWatcher.off();
  }

  render() {
    console.log(this.props);

    var itemLinks =[]; 
    for (var key in this.state.items) {
      itemLinks.push(this.renderItem(key, this.state.items[key]))
    }

    return <div className = "row">
      <div id="sidebar" className="large-3 columns">
        <div className="row">
          {itemLinks}
        </div>
      </div>
      <div id="content" className="large-9 columns">
        { (this.props.children) ? 
          React.cloneElement(this.props.children, {user: this.props.user}) 
          : null }
      </div>
    </div>
  }

  renderItem(key, item) {

    //!!! Where does type get found / passed
    var targetUrl = `/list/${this.props.params.type}/${key}`
    return <div key={key} ><Link to={targetUrl} activeClassName="active">{item.name}</Link></div>
  }

 
}