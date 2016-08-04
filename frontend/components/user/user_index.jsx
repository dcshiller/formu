const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../../stores/session_store')

const UserIndex = React.createClass({
  getInitialState(){
    return {
      username: SessionStore.currentUser()
    };
  },
  render(){
    return(
      <div className="userBox">
          <h2> Form Manager </h2>
          <Link to={`${this.state.username}/design`} id="newForm"> + New Form</Link>
      </div>
    )
  }


});


module.exports = UserIndex;
