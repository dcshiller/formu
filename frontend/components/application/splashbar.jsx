const React = require('react');
import { hashHistory, Link } from 'react-router'
const AuthActions = require('../../actions/auth_actions');
const SessionStore = require ('../../stores/session_store')

const Splashbar = React.createClass({

  componentDidMount () {
    this.sessionStoreReceipt = SessionStore.addListener(this.userChange);
  },

  componentWillUnmount () {
    this.sessionStoreReceipt.remove();
  },

  loginAsGuest (e) {
    e.preventDefault();
    AuthActions.login({username:"Guest", password:"Password"});
    hashHistory.push("/users/Guest" )
  },

  startClouds () {
    $('img[class^=cloud]').addClass('visible');
  },

  userChange () {
    this.setState({currentUser: SessionStore.currentUser()});
  },

  render () {
    setTimeout(this.startClouds, 1000)
    return (
      <div>
        <div className="skyscape">
          <img className="cloud1" src={window.cloud1URL}/>
          <img className="cloud2" src={window.cloud2URL}/>
          <img className="cloud3" src={window.cloud3URL}/>
          <img className="cloud4" src={window.cloud4URL}/>
          <img className="mammoth" src={window.mammothURL} alt="Muey the Mastodon"/>
          <h1> Create and share your forms. </h1>
          { !!(SessionStore.currentUser()) || (
            <div className="buttonBar container">
            <button id="skyscapeLogin" onClick={this.loginAsGuest}>
              GUEST LOGIN
            </button>
            <Link to='signup' id="skyscapeSignup">SIGN UP</Link>
            </div>
          )
          }}
        </div>
        <span className="tagline">
          Building forms can be beastly.<br/><br/>

          <span className="red">Forμ</span> makes it quicker and easier. <br/><br/><br/><br/>


          A <a href="http://www.wufoo.com">wufoo</a> clone.
        </span>
      </div>
    )
  }
})


module.exports = Splashbar;
