import React from "react"
import {fb} from "../../firebase"
import EditItem from "./EditItem"


export default class NewItem extends React.Component {

  componentWillMount() {
    /*
    if (this.state.new) {
        console.log(this.props.user);
        this.pageRef = fb().child('page').push();
        this.pageRef.update({owner:this.props.user.key, name:"", body:""});

        //!!! hey, we should probably copy the state instead of writing it null
        this.props.history.replaceState(null, "/edit/page/"+this.pageRef.key());
      }
      else {
        this.pageRef = fb.child('page/'+this.props.params.id);
      }
    */
  }

  render() {

  }
}