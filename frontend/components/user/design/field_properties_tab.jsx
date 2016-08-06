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
    let fieldBuilder = this.props.fieldBuilder.bindArg(this, this.inputHandler)
    return(
      <div className="designTab">
        <form className="tabForm">
          { this.props.field &&
            fieldBuilder( "Label",
                          "text",
                          this.props.field && this.props.field["Label"] ) }
          { this.props.field &&
            fieldBuilder( "Instructions",
                          "text",
                          this.props.field && this.props.field["Description"]) }
       </form>
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
