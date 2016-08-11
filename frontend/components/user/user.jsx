const React = require('react');
const Index = require('./user_index.jsx');
const UserNavBar = require('./user_nav_bar.jsx');
// const Link = require('react-router').Link;
const SessionStore = require('../../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;
const Design = require('./design/design.jsx')


const User = React.createClass({

  getInitialState () {
    let currentUser = SessionStore.currentUser();
    return {currentUser: currentUser};
  },

  componentDidMount () {
    window.resizeListener = this.forceUpdate.bind(this, null)
    window.addEventListener("resize", resizeListener)
  },

  componentWillUnmount(){
    window.removeEventListener("resize", window.resizeListener)
  },

  tooSmallWarning () {
    if (window.innerWidth < 600){
      if (window.innerHeight > 300 ){
        var title = (<h1> Dear guru
            <br/>
          of the tiny screen, </h1>)}

      return (<div className="tooSmall">
                { title }
                <p> Sorry, we cannot accommodate your austere ways. <br/>
                </p>
                <footer>
                    Please consider trying us on a larger screen.
                </footer>
              </div>)
    }
  },

  render(){
    return(
      <div className="userMain container">
        {this.tooSmallWarning()}
        <UserNavBar currentUser={this.state["currentUser"]} />
        {this.props.children}
      </div>
    );
  }
});

module.exports = User;
