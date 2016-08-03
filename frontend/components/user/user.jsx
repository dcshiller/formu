const React = require('react')
const UserNavBar = require('./user_nav_bar.jsx')

const User = React.createClass({
  render(){
    return(
      <div className="userMain">
        <UserNavBar/>
        <div className="userBox">
            <h2> Form Manager </h2>
        </div>
      </div>
    );
  }
});

module.exports = User;
