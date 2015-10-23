import React from "react"
import {fb} from "../../firebase"
import EditItem from "./EditItem"


export default class NewItem extends React.Component {

  render() {
    return <EditItem {...this.props} isNew={true}/> 
  }
}