import {fb, FBSetWatcher} from "../firebase"
import React from "react"
import {Link} from "react-router"


export default class List extends React.Component {

  componentWillMount() {
    this.state = {};
    this.pages = [];


    //create the listeners for this page in firebase
    this.itemsWatcher = new FBSetWatcher(fb().child(this.props.params.type));
    this.itemsWatcher.on(items => this.setState({type: this.props.params.type, items}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemsWatcher.off();
    this.itemsWatcher = new FBSetWatcher(fb().child(nextProps.params.type));
    this.itemsWatcher.on(items => this.setState({type: nextProps.params.type, items}));
  }

  componentWillUnmount() {
    this.itemsWatcher.off();
  }

  render() {
    var itemLinks =[]; 
    for (var key in this.state.items) {
      itemLinks.push(this.renderItem(key, this.state.items[key]))
    }

    return <div className="row">
      {itemLinks}
    </div>;
  }

  renderItem(key, item) {

    //!!! Where does type get found / passed
    var targetUrl = `/${this.state.type}/${key}`
    return <div key={key} ><Link to={targetUrl} activeClassName="active">{item.name}</Link></div>
  }

 
}