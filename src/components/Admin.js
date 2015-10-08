import {fb} from "../firebase"
import React from "react"
import {Link} from "react-router"

export default class Admin extends React.Component {
	constructor () {
		super();
	}
	render() {
		return <div>{ (this.props.children) ? 
	   				React.cloneElement(this.props.children, {authData: this.props.authData }) 
	   				: null }</div>
	}
}