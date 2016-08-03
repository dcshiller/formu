const React = require('react')
const Link = require('react-router').Link

const Navbar = React.createClass({
  render(){
    return(
      <div>
        <navbar>
          <header>
            <img id="logo" src={window.logoURL}/>
            <Link to="login" id="login">LOGIN</Link>
          </header>
        </navbar>
      </div>
    )
  }
});

module.exports = Navbar;
