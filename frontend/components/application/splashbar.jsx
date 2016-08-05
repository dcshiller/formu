const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory


const Splashbar = React.createClass({
  // debugthis(e){
  //   e.preventDefault();
  // },
  render(){
    return (
      <div className="skyscape">
        <h1> Create and share your forms. </h1>
        <Link to='signup' className="signup">SIGN UP</Link>
      </div>
    )
  }
})


module.exports = Splashbar;
