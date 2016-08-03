const React = require('react');
const Link = require('react-router').Link

const Splashbar = React.createClass({
  render(){
    return (
      <div className="skyscape">
        <h1> Create and share your forms. </h1>
        <Link to="/signup" className="signup">SIGN UP</Link>
      </div>
    )
  }
})


module.exports = Splashbar;
