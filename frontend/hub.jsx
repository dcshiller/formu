const React = require('react');
const ReactDOM = require('react-dom');
import { reactRouter, IndexRoute, Router , Route , hashHistory } from 'react-router';
import { App, Login, Signup, Splashbar } from './components/application/application_hub.js';
import { User , UserIndex , Design } from './components/user/user_hub.js';
const Respond = require('./components/respond/respond.jsx');
const Response = require('./components/respond/response.jsx')
const SessionStore = require('./stores/session_store.js');
const AuthActions = require('./actions/auth_actions.js');
const FormActions = require('./actions/auth_actions.js');

window.getIfDefined = function(...args){
  let nestLevel = args[0];
  for (var i = 1; i < args.length - 1; i++) {
    if (args[i])
      { nestLevel = nestLevel[args[i]]; }
    else
      { return undefined; }
  }
  return nestLevel && nestLevel[args[i]];
};

window.doIfDefined = function(func, ...args){
  let arg = getIfDefined(...args)
  if (arg !== undefined) {func.call(this, arg)}
};

const populateStores = function(username){
  AuthActions.loginUser({username: username});
};

const validate = function(nextState, replace){
  let username = window.location.hash.split("/") [2].split("?")[0]
  if (!(window.currentUser == username || SessionStore.currentUser() == username))
  {
    replace('/login')
  }
};

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splashbar}/>
      <Route path="welcome" component={Splashbar }/>
      <Route path="signup" component={Signup}/>
      <Route path={':username/form/:formId'} component={Respond}/>
      <Route path={':username/form/:formId/:responseId'} component={Response}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path={'users/:username'} component={User} >
      <IndexRoute component={UserIndex} onEnter={validate}/>
      <Route path={'/:username/design'} component={Design}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
    doIfDefined(populateStores, window, "currentUser")
    ReactDOM.render(routes,
                    document.getElementById('main')
                   );
  }
);
