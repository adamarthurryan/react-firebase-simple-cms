import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import React from "react"

import App from './components/App';
import ViewItem from './components/view/ViewItem';
import Admin from './components/Admin';
import Login from './components/Login';
import EditItem from './components/edit/EditItem';
import List from './components/List';


//load site data from firebase


class Empty extends React.Component {
  constructor () {
    super();
  }
  render() {
    return <div>{ (this.props.children) ? 
            React.cloneElement(this.props.children, {user: this.props.user }) 
            : null }</div>
  }
}

//!!! should the routes be more predetermined?
//ie. should the routes list every possible permissible edit, new, list, etc. option?
//as it is now, users can attempt to create/view arbitrary content by manipulating the url

React.render (( 
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>


      <Route path="edit" component={Admin}>
        <Route path=":type" component={List} >
          <Route path="new" isNew={true} component={EditItem} />
          <Route path=":id" component={EditItem} />
        </Route>
      </Route>


      <Route path="login" component={Login} />

      <Route path="list/:type" component={List}>
        <Route path=":id" component={ViewItem} />
      </Route>

      <Route path=":type/:id" component={ViewItem} />


    </Route>
  </Router> 
), document.body);