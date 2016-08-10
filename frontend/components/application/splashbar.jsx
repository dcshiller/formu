const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory


const Splashbar = React.createClass({

  startClouds () {
    $('img[class^=cloud]').addClass('visible');
  },

  render () {
    setTimeout(this.startClouds, 1000)
    return (
      <div>
        <div className="skyscape">
          <img className="cloud1" src={window.cloud1URL}/>
          <img className="cloud2" src={window.cloud2URL}/>
          <img className="cloud3" src={window.cloud3URL}/>
          <img className="cloud4" src={window.cloud4URL}/>
          <img className="mammoth" src={window.mammothURL}/>
          <h1> Create and share your forms. </h1>
          <Link to='signup' className="signup">SIGN UP</Link>
        </div>
        <span className="tagline">
          Building forms can be tiresome.<br/><br/>

          <span className="red">Forμ</span> makes it quicker and easier.
        </span>
      </div>
    )
  }
})


module.exports = Splashbar;
