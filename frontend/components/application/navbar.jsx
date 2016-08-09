const React = require('react')
const Link = require('react-router').Link
const AuthActions = require('../../actions/auth_actions.js')
const SessionStore = require('../../stores/session_store.js')

const Navbar = React.createClass({

  getInitialState () {
    return {currentUser: SessionStore.currentUser()}
  },

  componentDidMount () {
    this.sessionStoreReceipt = SessionStore.addListener(this.userChange);
  },

  componentWillUnmount () {
    this.sessionStoreReceipt.remove();
  },

  logout () {
    AuthActions.logout();
  },

  textTo(newText, e){
    document.getElementById(e.target.id).innerText = newText;
  },

  loginOrLogout () {
    if (SessionStore.currentUser())
      {
       return  (<button onClick={this.logout} id="logout">
                  LOGOUT {this.state.currentUser}
                </button>);
      }
    return ( <span className="container">
               <Link to="login"
                     query={{user: "Guest"}}
                     id="loginGuest"
                     onMouseEnter={this.textTo.bind(this,"GWWRRRR...")}
                     onMouseLeave={this.textTo.bind(this,"GUEST LOGIN")}>
                   GUEST LOGIN
               </Link>

                <Link to="login"
                    id="login"
                    onMouseEnter={this.textTo.bind(this,"GWRR...")}
                    onMouseLeave={this.textTo.bind(this,"LOGIN")}>
                    LOGIN
               </Link>
             </span>
            )
  },

  userChange () {
    this.setState({currentUser: SessionStore.currentUser()});
  },

  render () {
    return(
      <div>
        <navbar>
          <header>
            <Link to="/"> <img id="logo" src={window.logoURL}/> </Link>
            {this.loginOrLogout()}
          </header>
        </navbar>
      </div>
    )
  }
});

module.exports = Navbar;
