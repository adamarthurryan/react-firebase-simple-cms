
import React from "react"

import Page from "./Page"
import User from "./User"
import Setting from "./Setting"
import Message from "../Message"

import {fb, FBObjectWatcher} from "../../firebase"

import {Link} from "react-router"


export default class ViewItem extends React.Component {

  componentWillMount() {
    this.setState({item:null});
    this.itemWatcher = new FBObjectWatcher(fb().child(this.props.params.type+'/'+this.props.params.id));
    this.itemWatcher.on(item => this.setState({item: item}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemWatcher.off();
    this.itemWatcher = new FBObjectWatcher(fb().child(this.props.params.type+'/'+nextProps.params.id));
    this.itemWatcher.on(item => this.setState({item: item}));
  }

  componentWillUnmount() {
    this.itemWatcher.off();
  }

  render() {
    if (! this.state.item) 
      return <Message message="Loading..."/>


    return <div>
      {this.renderItem()}
      <Link to={`/edit/${this.props.params.type}/${this.props.params.id}`}>Edit</Link>
    </div>
  }

  renderItem() {
    if (this.props.params.type == 'user')
      return <User {...this.props} item={this.state.item}/>
    else if (this.props.params.type == 'page')
      return <Page {...this.props} item={this.state.item}/>
    else if (this.props.params.type == 'setting')
      return <Setting {...this.props} item={this.state.item}/>
  }
}