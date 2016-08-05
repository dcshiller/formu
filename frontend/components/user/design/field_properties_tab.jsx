const React = require('react');

const FieldPropertiesTab = React.createClass({
  render(){
    return(
      <div className="designTab">
        <ul>
        {this.props.field.fieldId}
        </ul>
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
