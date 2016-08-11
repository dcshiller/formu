const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory
const AuthActions = require('../../actions/auth_actions.js');

const Splashbar = React.createClass({

  loginAsGuest (e) {
    e.preventDefault();
    AuthActions.login({username:"Guest", password:"Password"});
    hashHistory.push("/users/Guest" )
  },

  startClouds () {
    $('img[class^=cloud]').addClass('visible');
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
          <div className="buttonBar container">
            <button id="skyscapeLogin" onClick={this.loginAsGuest}>
              GUEST LOGIN
            </button>
            <Link to='signup' id="skyscapeSignup">SIGN UP</Link>
          </div>
        </div>
        <span className="tagline">
          Building forms can be tiresome.<br/><br/>

          <span className="red">Forμ</span> makes it quicker and easier. <br/><br/><br/><br/>


          A <a href="http://www.wufoo.com">wufoo</a> clone.
        </span>
      </div>
    )
  }
})


module.exports = Splashbar;
