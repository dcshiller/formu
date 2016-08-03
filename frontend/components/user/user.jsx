const React = require('react');
const UserNavBar = require('./user_nav_bar.jsx');
const SessionStore = require('../../stores/session_store.js');
const hashHistory = require('react-router').hashHistory;

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
        <UserNavBar/>
        <div className="userBox">
            <h2> Form Manager </h2>
            <button id="newForm"> + New Form</button>
        </div>
      </div>
    );
  }
});

module.exports = User;
