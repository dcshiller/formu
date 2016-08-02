const React = require('react')
const Link = require('react-router').Link

const Navbar = React.createClass({
  render(){
    return(
      <div>
        <navbar>
          <span id="logo">ForMu</span>
          <Link to="login" id="login">LOGIN</Link>
        </navbar>
      </div>
    )
  }
});

module.exports = Navbar;
