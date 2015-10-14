import React from "react"
import Page from "./Page"
import User from "./User"

import {Link} from "react-router"



export default class ViewItem extends React.Component {

  //to do - the fb data loading logic should happen here
  render() {

    return <div>
      {this.renderItem()}
      <Link to={`/edit/${this.props.params.type}/${this.props.params.id}`}>Edit</Link>
    </div>
  }

  renderItem() {
    if (this.props.params.type == 'user')
      return <User {...this.props}/>
    else if (this.props.params.type == 'page')
      return <Page {...this.props}/>
  }
}