import {fb} from "../firebase"
import React from "react"

export default class Page extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

    componentWillMount() {
        //mount the listener for this page in firebase
        fb.child('pages/'+this.props.params.id).on("value", this.updateContent);
    }

	render() {
		return <div className="row">
			<h1 className="large-12 columns">{this.state.title}</h1>
			<div className="large-12 columns">{this.state.body}</div>
			<div className="large-12 columns"><em>Created by {this.state.owner}</em></div>
		</div>;
	}

    //called when the firebase record changes or has a value
    updateContent = snapshot => {
      console.log("snapshot.val()",snapshot.val());
      this.setState(snapshot.val());  
    } 

}