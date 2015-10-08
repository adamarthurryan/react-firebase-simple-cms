import { Router, Route, Link } from 'react-router'
import React from "react"

import App from './components/App';
import Page from './components/Page';
import Admin from './components/Admin';
import Login from './components/Login';
import EditPage from './components/EditPage';


React.render (( 
  <Router>
    <Route path="/" component={App}>
      <Route path="admin" component={Admin}>
      	<Route path="pages/:id" component={EditPage} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="pages/:id" component={Page} />-->
    </Route>
  </Router>
), document.body);