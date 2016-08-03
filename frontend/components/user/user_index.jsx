const React = require('react');
const Index = React.createClass({
  render(){
    return(
      <div className="userBox">
          <h2> Form Manager </h2>
          <Link to="design" id="newForm"> + New Form</Link>
      </div>
    )
  }


});


module.exports = Index;
