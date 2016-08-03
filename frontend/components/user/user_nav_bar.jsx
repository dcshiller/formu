const React = require('react')

const UserNavBar = React.createClass({

  render(){
    return(
      <navbar>
        <img src={window.logoURL} />
      </navbar>
    )
  }
});


module.exports = UserNavBar;
