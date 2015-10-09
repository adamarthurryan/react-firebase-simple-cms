import {fb} from "../firebase"
import React from "react"

export default class Page extends React.Component {

    componentWillMount() {
        //mount the listener for this page in firebase
        this.fbRef = fb.child('pages/'+this.props.params.id);
        this.fbRef.on("value", this.fbOnValue);
    }

    componentWillReceiveProps(nextProps) {
    	this.fbRef.off();
        this.fbRef = fb.child('pages/'+nextProps.params.id);
        this.fbRef.on("value", this.fbOnValue);
    }

    componentWillUnmount() {
    	this.fbRef.off();
    }

	render() {
		return <div className="row">
			<h1 className="large-12 columns">{this.state.title}</h1>
			<div className="large-12 columns">{this.state.body}</div>
			<div className="large-12 columns"><em>Created by {this.state.owner}</em></div>
		</div>;
	}

    //called when the firebase record changes or has a value
    fbOnValue = snapshot => {
      this.setState(snapshot.val());  
    } 

}