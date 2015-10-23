import ReactDOM from "react-dom"
import React from "react"


import {fb, FBUserWatcher, FBObjectWatcher} from "../firebase"


import App from './components/App';
import Admin from './components/Admin';
import Login from './components/Login';





ReactDOM.render (( 
  <App />
), document.body);

/*

  <Locations>
    <Location path="/" Location={App}>


      <Location path="edit" handler={Admin}>
        <Location path=":type" handler={List} >
          <Location path="new" isNew={true} handler={EditItem} />
          <Location path=":id" handler={EditItem} />
        </Location>
      </Location>


      <Location path="login" handler={Login} />

      <Location path="list/:type" handler={List}>
        <Location path=":id" handler={ViewItem} />
      </Location>

      <Location path=":type/:id" handler={ViewItem} />


    </Location>
  </Locations> 
*/
//!!! should the routes be more predetermined?
//ie. should the routes list every possible permissible edit, new, list, etc. option?
//as it is now, users can attempt to create/view arbitrary content by manipulating the url
/*
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
*/