const React = require('react');
const Link = require('react-router').Link
const AuthActions = require('../actions/auth_actions.js');
const SessionStore = require('../stores/session_store.js')
const hashHistory = require('react-router').hashHistory

const Login = React.createClass({
  getInitialState () { return {username: "", password: ""}},
  onChange(){
    hashHistory.push("/")
  },
  componentDidMount() {
    SessionStore.addListener(this.onChange);
  },
  inputHandler (e) {
    e.preventDefault();
    let newVals = {};
    newVals[e.target.id] = e.target.value;
    this.setState( newVals )
  },
  login () {
    AuthActions.login(this.state)
  },
  render(){
    return (
      <div className="authformOuter">
        <div className="authformInner">
          <form className="login">
            <h2> Forμ Welcomes You! </h2>
            <span> Hey fellow form-builder, please log in. </span>
            <hr/>
            <label htmlFor="username"> Username</label>
            <input type="text" id="username" onChange={this.inputHandler} value={this.state.username}/>
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" onChange={this.inputHandler} value={this.state.password}/>
            <button onClick={this.login}>Login</button>
          </form>

          <Link to="signup"> Sign Up is Free </Link>
        </div>
      </div>
    )

  }
});

module.exports = Login;
