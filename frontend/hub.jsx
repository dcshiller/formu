const React = require('react');
const ReactDOM = require('react-dom');
import { reactRouter , IndexRoute, Router , Route , hashHistory } from 'react-router'
const App = require('./components/app.jsx')
const Login = require('./components/login.jsx')
const Signup = require('./components/signup.jsx')

const routes = (
  <Router history={hashHistory} >
    <IndexRoute component={App}/>
      <Route path="/" component={App}>
      <Route path="signup" component={Signup}/>
    </Route>
    <Route path="login" component={Login}/>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
    ReactDOM.render(routes,
                    document.getElementById('main')
                   );
  }
);
