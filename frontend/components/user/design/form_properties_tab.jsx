const React = require('react');
const Field = require('../../field');
const DesignActions = require('../../../actions/design_actions')

const FormPropertiesTab = React.createClass({
  inputHandler (e) {
    e.preventDefault();
    DesignActions.changeFormProperty(e.target.id.split("_").pop(), e.target.value);
    this.forceUpdate();
  },
  render () {
    return(
      <div className="designTab">
        <form className="tabForm">
          { this.props.fieldBuilder("Title", "text", this.inputHandler, this.props.form.properties["Title"]) }
          { this.props.fieldBuilder("Description", "text", this.inputHandler, this.props.form.properties["Description"]) }
        </form>
      </div>
    )
  }
});


module.exports = FormPropertiesTab;
