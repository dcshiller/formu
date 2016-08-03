const React = require('react')
const Link = require('react-router').Link
const AuthActions = require('../actions/auth_actions.js')
const SessionStore = require('../stores/session_store.js')
const Navbar = React.createClass({
  logout(){
    AuthActions.logout();
  },
  loginOrLogout(){
    if (SessionStore.currentUser){return <button onClick={this.logout} id="logout">LOGOUT</button>;}
    return <Link to="login" id="login">LOGIN</Link>
  },
  render(){
    return(
      <div>
        <navbar>
          <header>
            <img id="logo" src={window.logoURL}/>
            {this.loginOrLogout()}
          </header>
        </navbar>
      </div>
    )
  }
});

module.exports = Navbar;
