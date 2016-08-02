const React = require('react')
const Link = require('react-router').Link

const Navbar = React.createClass({
  render(){
    return(
      <div>
        <navbar>
          <img id="logo" src={window.logoURL}/>
          <Link to="login" id="login">LOGIN</Link>
        </navbar>
      </div>
    )
  }
});

module.exports = Navbar;
