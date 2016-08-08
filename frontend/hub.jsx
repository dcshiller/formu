const React = require('react');
const ReactDOM = require('react-dom');
import { reactRouter , IndexRoute, Router , Route , hashHistory } from 'react-router'
import { App, Login, Signup, Splashbar } from './components/application/application_hub.js'
import { User , UserIndex , Design } from './components/user/user_hub.js'
const SessionStore = require('./stores/session_store.js')

window.getIfDefined = function(object, property){
  return (object && object[property])
};

const validate = function(nextState, replaceState){
  if (SessionStore.currentUser())
  {
    hashHistory.replace('/login')
  }
};

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splashbar}/>
      <Route path="welcome" component={Splashbar}/>
      <Route path="signup" component={Signup}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path={':username'} component={User} onEnter={validate}>
      <IndexRoute component={UserIndex}/>
      <Route path={'/:username/design'} component={Design}/>
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", function(){
    ReactDOM.render(routes,
                    document.getElementById('main')
                   );
  }
);
