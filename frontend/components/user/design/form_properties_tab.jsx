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
    let fieldBuilder = this.props.fieldBuilder.bind(null, this.inputHandler)
    return(
      <div className="designTab">

        <form className="tabForm">
          { fieldBuilder("Title",
                          "text",
                          this.props.form.properties["Title"]) }
          { fieldBuilder( "Description",
                          "text",
                          this.props.form.properties["Description"]) }
        </form>
      </div>
    )
  }
});


module.exports = FormPropertiesTab;
