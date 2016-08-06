const React = require('react');
const DesignActions = require('../../../actions/design_actions')
const Field = require('../../field')

const FieldPropertiesTab = React.createClass({
  inputHandler (e) {
    e.preventDefault();
    DesignActions.changeFieldProperty(e.target.id.split("_").pop(), e.target.value);
    this.forceUpdate();
  },
  render(){
    return(
      <div className="designTab">
        <form className="tabForm">
          { this.props.field && this.props.fieldBuilder("Label", "text", this.inputHandler,  this.props.field && this.props.field["Label"] ) }
          { this.props.field && this.props.fieldBuilder("Instructions", "text", this.inputHandler, this.props.field && this.props.field["Description"]) }
       </form>
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
