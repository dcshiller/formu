const React = require('react');
const ReactDOM = require('react-dom');
import { reactRouter , IndexRoute, Router , Route , hashHistory } from 'react-router'
import { App, Login, Signup, Splashbar } from './components/application/application_hub.js'
import { User , UserIndex , Design } from './components/user/user_hub.js'
const SessionStore = require('./stores/session_store.js')

Function.prototype.bindArg(func, arg){
  return function(...moreArgs){func(arg, ...moreArgs);}
}

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splashbar}/>
      <Route path="welcome" component={Splashbar}/>
      <Route path="signup" component={Signup}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path={':username'} component={User}>
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
