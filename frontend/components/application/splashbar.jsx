const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory


const Splashbar = React.createClass({
  render(){
    return (
      <div className="skyscape">
        <h1> Create and share your forms. </h1>
        <a onClick={function(){hashHistory.push("signup") } } className="signup">SIGN UP</a>
      </div>
    )
  }
})


module.exports = Splashbar;
