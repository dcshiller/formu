const React = require('react');
const Field = require('../../field');
const DesignActions = require('../../../actions/design_actions')

const FormPropertiesTab = React.createClass({
  // getInitialState(){
  //   return { "Title": {this.props.form.properties["Title"]} };
  // },
  inputHandler (e) {
    // e.preventDefault();
    let newVals = {};
    // newVals[e.target.id] = e.target.value;
    DesignActions.changeFormProperty(e.target.id, e.target.value)
    this.forceUpdate();
    // this.props.changeHandler("properties", newVals, this.forceUpdate );
  },
  fieldBuilder(fieldName, fieldType, handler){
    return (
      <Field fieldVals={ { fieldName: fieldName,
                  fieldType: fieldType,
                  handler: handler,
                  fieldValue: this.props.form.properties[fieldName]}} />
    )
  },
  render(){
    return(
      <div className="designTab">
        <form className="tabForm">
          { this.fieldBuilder("Title", "text", this.inputHandler) }
          { this.fieldBuilder("Description", "text", this.inputHandler) }
        </form>
      </div>
    )
  }
});


module.exports = FormPropertiesTab;
