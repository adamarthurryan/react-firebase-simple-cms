import {fb} from "../firebase"
import React from "react"
import {Link} from "react-router"


export default class PageList extends React.Component {

    componentWillMount() {
        this.state = {};
        this.pages = [];

        //create the listeners for this page in firebase
        this.fbRef = fb.child('pages');
        this.fbRef.on("child_added", this.fbOnChildAdded);
        this.fbRef.on("child_removed", this.fbOnChildRemoved);
        this.fbRef.on("child_changed", this.fbOnChildChanged);
    }

    componentWillUnmount() {
    	this.fbRef.off();
    }

	render() {
        var pageLinks =[]; 
        for (var i in this.state.pages) {
            pageLinks.push(this.renderPage(this.state.pages[i]))
        }

		return <div className="row">
            {pageLinks}
		</div>;
	}

    renderPage(page) {
        var targetUrl = `/pages/${page.key}`
        return <div key={page.key} ><Link to={targetUrl}>{page.title}</Link></div>
    }

    //called when the firebase record changes or has a value
    fbOnChildAdded = snapshot => {
        var page = snapshot.val();
        Object.assign(page, {key:snapshot.key()});
        
        this.pages.push(page);
        this.setState({
            pages: this.pages
        });
    } 

    //called when the firebase record changes or has a value
    fbOnChildRemoved = snapshot => {
        var key = snapshot.key();
        this.pages.splice(this.pages.findIndex(page => page.key==key),1);
        this.setState({
            pages: this.pages
        });
    }

    //called when the firebase record changes or has a value
    fbOnChildChanged = snapshot => {
        var newPage = snapshot.val();
        var key = snapshot.key();
        Object.assign(newPage, {key});

        this.pages[this.pages.findIndex(page => page.key==key)] = newPage;

        this.setState({
            pages: this.pages
        });
    }
}