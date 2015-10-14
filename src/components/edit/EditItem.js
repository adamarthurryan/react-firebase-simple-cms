import React from "react"
import EditPage from "./EditPage"
import EditUser from "./EditUser"

//!!! abstract away firebase access to EditItem

export default class EditItem extends React.Component {
  render() {
    console.log(this.props);
    if (this.props.params.type == 'user')
      return <EditUser {...this.props}/>
    else if (this.props.params.type == 'page')
      return <EditPage {...this.props}/>
  }
}