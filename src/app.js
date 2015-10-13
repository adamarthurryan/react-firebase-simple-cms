import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import React from "react"

import App from './components/App';
import Page from './components/Page';
import User from './components/User';
import Admin from './components/Admin';
import Login from './components/Login';
import EditPage from './components/EditPage';
import EditUser from './components/EditUser';


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

var NewItem = Empty;
class EditItem = Empty;
class ViewItem = Empty;

React.render (( 
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>

      <Route path="edit" component={Admin}>
        <Route path=":type" component={Empty} >
          <Route path="new" component={NewItem} />
          <Route path=":id" component={EditItem} />
        </Route>
      </Route>


      <Route path="login"  testval="TESTING"  component={Login} />

      <Route path=":type" component={Empty}>
        <Route path=":id" component={ViewItem} />
      </Route>


    </Route>
  </Router> 
), document.body);