const React = require('react');
const Index = require('./user_index.jsx');
const UserNavBar = require('./user_nav_bar.jsx');
const Link = require('react-router').Link;
const SessionStore = require('../../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;
const Design = require('./design/design.jsx')


const User = React.createClass({
  getInitialState(){
    let currentUser = SessionStore.currentUser();
    if (!currentUser) {
      hashHistory.push('login')}
    return {currentUser: currentUser};
  },
  render(){
    return(
      <div className="userMain">
        <UserNavBar />
        {this.props.children}
      </div>
    );
  }
});

module.exports = User;
