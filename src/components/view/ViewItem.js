
import React from "react"

import Page from "./Page"
import User from "./User"
import Setting from "./Setting"
import Message from "../Message"

import {fb, FBObjectWatcher} from "../../firebase"

import {Link} from "react-router-component"

 
export default class ViewItem extends React.Component {

  componentWillMount() {
    this.setState({item:null});
    this.itemWatcher = new FBObjectWatcher(fb().child(this.props.type+'/'+this.props.id));
    this.itemWatcher.on(item => this.setState({item: item}));
  }

  componentWillReceiveProps(nextProps) {
    this.itemWatcher.off();
    this.itemWatcher = new FBObjectWatcher(fb().child(this.props.type+'/'+nextProps.id));
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
      <Link global href={`/${this.props.type}/${this.props.id}/edit`}>Edit</Link>
    </div>
  }

  renderItem() {
    if (this.props.type == 'user')
      return <User {...this.props} item={this.state.item}/>
    else if (this.props.type == 'page')
      return <Page {...this.props} item={this.state.item}/>
    else if (this.props.type == 'setting')
      return <Setting {...this.props} item={this.state.item}/>
  }
}