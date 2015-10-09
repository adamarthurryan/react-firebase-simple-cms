import {fb} from "../firebase"
import React from "react"
import {Link} from "react-router"

import Navbar from "./Navbar.js"
import PageList from "./PageList.js"

export default class App extends React.Component {

	//set initial state
	constructor() {
		super();
        var authData = fb.getAuth();
        this.state = {authData}
    }


    render () {
    	return <div>
    		<header>
    			<Navbar location={this.props.location} params={this.props.params} authData={this.state.authData}/>
    		</header>

            <div id="app" className="row">
                <div id="sidebar" className="large-3 columns">
	   		      <PageList authData={this.state.authData}/>
            	</div>
                <div id="content" className="large-9 columns">
                    { (this.props.children) ? 
                        React.cloneElement(this.props.children, {authData: this.state.authData }) 
                        : null }
                </div>
			</div>
	        <footer className="row">
	        	<p className="text-right"><em>Simple serverless CMS with React and Firebase.</em></p>
	        </footer>
	    </div>
    }


    // the callback for authorization changes
    authChanged (authData) {
        this.setState({authData});
    }

    //when the component is mounted, register its listeners
    componentDidMount() {
        //note that the callback must be bound to this
        fb.onAuth(this.authChanged.bind(this));
    }
    //unregister listeners for unmounted component
    componentWillUnmount() {
        fb.offAuth(this.authChanged);
    }

} 