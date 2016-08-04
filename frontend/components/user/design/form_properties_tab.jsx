const React = require('react');

const FormPropertiesTab = React.createClass({
  render(){
    return(
      <div className="designTab">
        <form className="tabForm">
          <label htmlFor="FormTitle"> Form Title </label>
          <input type="text"></input>
        </form>
      </div>
    )
  }
});


module.exports = FormPropertiesTab;
