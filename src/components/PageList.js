import {fb, FBSetWatcher} from "../firebase"
import React from "react"
import {Link} from "react-router"


export default class PageList extends React.Component {

  componentWillMount() {
    this.state = {};
    this.pages = [];

    //create the listeners for this page in firebase
    this.pagesWatcher = new FBSetWatcher(fb().child('page'));
    this.pagesWatcher.on(pages => this.setState({pages}));
  }

  componentWillUnmount() {
    this.pagesWatcher.off();
  }

  render() {
    var pageLinks =[]; 
    for (var key in this.state.pages) {
      pageLinks.push(this.renderPage(key, this.state.pages[key]))
    }

    return <div className="row">
      {pageLinks}
    </div>;
  }

  renderPage(key, page) {
    var targetUrl = `/page/${key}`
    return <div key={key} ><Link to={targetUrl} activeClassName="active">{page.title}</Link></div>
  }

 
}