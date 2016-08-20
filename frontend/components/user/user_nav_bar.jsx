const React = require('react');
const Link = require('react-router').Link;


const UserNavBar = React.createClass({

  render(){
    return(
      <navbar>
        <Link to={ this.props.currentUser && !window.location.hash.includes("users")  ? "/users/" +(this.props.currentUser) : "/"}>
          <img src={window.logoURL}/>
        </Link>
      </navbar>
    );
  }

});


module.exports = UserNavBar;
