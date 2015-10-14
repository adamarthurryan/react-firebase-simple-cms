import React from "react"
import {Link, IndexLink} from "react-router"
import {fb} from "../firebase.js"

export default class Navbar extends React.Component {

  render() {

    //adapted  from Founation documentation
    return <nav className="top-bar" data-topbar role="navigation">
      <ul className="title-area">
        <li className="name">
          <h1><Link to="/">Serverless CMS</Link></h1>
        </li>
        <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
      </ul>
    
      <section className="top-bar-section">
        <ul className="right">
          {this.renderUserDropdown()}
        </ul>

        <ul className="left">
          {this.renderNew()}
          {this.renderEditView()}
          {this.renderList()}
        </ul>

      </section>
    </nav>
  }

  //render the edit items if there is a user logged in
  renderNew() {
    if (!this.props.user)
      return null;

    return <li className="has-dropdown">
      <a>New</a>
        <ul className="dropdown">
        <li><Link to="/edit/page/new">Page</Link></li>
      </ul>
    </li>
  }

  renderEditView() {
    if (!this.props.user)
      return null;

    //determine if this is a page view
    if (this.props.location.pathname.startsWith("/page/")) {
      var targetUrl = "/edit/page/"+this.props.params.id;
      return <li><Link to={targetUrl}>Edit</Link></li>
    }

    //or a page edit view
    if (this.props.location.pathname.startsWith("/edit/page/") && this.props.params.id) {
      var targetUrl = "/list/page/"+this.props.params.id;
      return <li><Link to={targetUrl}>View</Link></li>
    }
    
    return null;
  }

  //render the item list options
  renderList() {
    return <li className="has-dropdown">
      <a>List</a>
        <ul className="dropdown">
        <li><Link to="/list/page">Pages</Link></li>
        <li><Link to="/list/user">Users</Link></li>
      </ul>
    </li>
  }

  renderUserDropdown() {
    if (!this.props.user)
      return <li><Link to="/login">Log In</Link></li>;
    else {
      return <li className="has-dropdown">
        <a href="#">{this.props.user.name}</a>
        <ul className="dropdown">
          <li><Link to="" onClick={this.signout}>Log Out</Link></li>
        </ul>
      </li>
    }

  }

  signout = evt => {
    evt.preventDefault();
    fb().unauth();
  }
}

/*
<nav className="top-bar" data-topbar role="navigation">
  <ul className="title-area">
    <li className="name">
      <h1><a href="#">My Site</a></h1>
    </li>
     <!-- Remove the className "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
    <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
  </ul>

  <section className="top-bar-section">
    <!-- Right Nav Section -->
    <ul className="right">
      <li className="active"><a href="#">Right Button Active</a></li>
      <li className="has-dropdown">
        <a href="#">Right Button Dropdown</a>
        <ul className="dropdown">
          <li><a href="#">First link in dropdown</a></li>
          <li className="active"><a href="#">Active link in dropdown</a></li>
        </ul>
      </li>
    </ul>

    <!-- Left Nav Section -->
    <ul className="left">
      <li><a href="#">Left Nav Button</a></li>
    </ul>
  </section>
</nav>
*/