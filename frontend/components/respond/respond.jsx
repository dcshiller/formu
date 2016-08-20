
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ErrorStore = require('../../stores/error_store');
const FormStore = require('../../stores/form_store.js');
const ResponseStore = require('../../stores/response_store.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');
const ResponseDatabaseActions = require('../../actions/response_database_actions.js');
const Field = require('../field');


const Respond = React.createClass({

  getInitialState () {
    return {form: FormStore.getFormInFocus()}
  },

  componentDidMount () {
    this.formStoreReceipt = FormStore.addListener(this.retrieveForm);
    FormDatabaseActions.getForm(this.props.params.formId);
    this.errorStoreReceipt = ErrorStore.addListener(this.checkErrors);
  },

  componentWillUnmount () {
    doIfDefined( "remove", this, "formStoreReceipt" );
    doIfDefined( "remove", this, "errorStoreReceipt" );
    doIfDefined( "remove", this, "responseStoreReceipt" );
  },

  checkErrors () {
    let errors = ErrorStore.retrieveErrors();
    if (errors.form === "Not Found"){this.setState({form: "FORM NOT FOUND"})}
  },

  drawField (fieldObj, index) {
    return (
      <div className="respondFieldWrapper"
           key={`wrapper_${index}`}>
      <Field fieldVals={ {
        fieldName: fieldObj.label || " ",
        instructions: fieldObj.instructions,
        fieldType: (fieldObj.type),
        fieldId: fieldObj.id,
        className: fieldObj.className || fieldObj.type,
        choices: fieldObj.choices,
      } }/>
      </div>
    )
  },

  drawFields () {
    if (this.state.form == "FORM NOT FOUND")
    {
      return <p className="notFoundMessage"> Form Not Found </p>
    }
    else if (getIfDefined(this.state.form, "fields"))
    {
      let self = this;
      let arrayOfFields = this.state.form.fields.map(function(field, index){
        return  self.drawField(field, index)
      })
      return arrayOfFields;
    }
  },

  getResponses () {
    return {responses:  $('form').serializeArray(), id: this.state.form.properties.id};
  },

  moveToResponseView () {
    let username = location.hash.split("/")[1]
    hashHistory.push(`${username}/form/${this.state.form.properties.id}/${ResponseStore.getResponse().id}`);
  },

  retrieveForm () {
    this.setState({form: FormStore.getFormInFocus()});
  },

  submitResponses () {
    this.responseStoreReceipt = ResponseStore.addListener(this.moveToResponseView)
    ResponseDatabaseActions.submitResponse(this.getResponses());
  },

  render(){
    return (
      <main className="formContainer">
        { <h1> { this.state.form.properties.title } </h1> }
        { <p className="instructions"> {this.state.form.properties.instructions }</p> }
        <form>
        { this.drawFields() }
        </form>
        <button className="submitButton" onClick={this.submitResponses}> Submit Form </button>
      </main>
    );
  }

});


module.exports = Respond;
