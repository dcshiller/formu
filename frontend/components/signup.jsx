const React = require('react')
const AuthActions = require('../actions/auth_actions.js');

const Signup = React.createClass({
  getInitialState () { return {username: "", password: "", email: ""}},
  inputHandler (e) {
    e.preventDefault();
    let newVals = {};
    newVals[e.target.id] = e.target.value;
    this.setState( newVals );
  },
  signup () {
    AuthActions.signup(this.state)
  },
  render(){
    return (
        <div className="signupform">
        <form className="sign up">
          <label htmlFor="email"> Email </label>
          <input type="text" id="email" value={this.state.email}/>
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" value={this.state.password}/>
          <label htmlFor="username"> Username </label>
          <input type="text" id="username" value={this.state.username}/>
          <button onClick={this.signup}>Sign Up</button>
        </form>
      </div>
    )
  }
});

module.exports = Signup;
