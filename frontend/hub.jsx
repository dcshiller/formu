const React = require('react');
const ReactDOM = require('react-dom');
import { reactRouter , IndexRoute, Router , Route , hashHistory } from 'react-router'
const App = require('./components/app.jsx')
const Login = require('./components/login.jsx')
const Signup = require('./components/signup.jsx')
const Splashbar = require('./components/splashbar.jsx')
const SessionStore = require('./stores/session_store.js')
import { User , Design } from './components/user/user_hub.js'
var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splashbar}/>
      <Route path="welcome" component={Splashbar}/>
      <Route path="signup" component={Signup}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path={':username'} component={User}>
      <Route path="design" component={Design}/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
    ReactDOM.render(routes,
                    document.getElementById('main')
                   );
  }
);
