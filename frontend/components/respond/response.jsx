
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ErrorStore = require('../../stores/error_store');
const FormStore = require('../../stores/form_store.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');
const ResponseDatabaseActions = require('../../actions/response_database_actions.js');
const Field = require('../field');


const Respond = React.createClass({

  getInitialState () {
    return {form: FormStore.getFormInFocus()}
  },

  componentDidMount () {
    this.formStoreReceipt = FormStore.addListener(this.retrieveForm);
    // FormDatabaseActions.getForm(this.props.params.formId);
    // this.errorStoreReceipt = ErrorStore.addListener(this.checkErrors);
  },

  componentWillUnmount () {
    this.formStoreReceipt.remove();
  },

  checkErrors () {
    let errors = ErrorStore.retrieveErrors();
    if (errors.form === "Not Found"){this.setState({form: "FORM NOT FOUND"})}
  },

  drawField (fieldObj) {
    return (
      <div className="respondFieldWrapper">
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
    else if (this.state.form && this.state.form.fields)
    {
      let self = this;
      let arrayOfFields = this.state.form.fields.map(function(field){
        return  self.drawField(field)
      })
      return arrayOfFields;
    }
  },

  // getResponses () {
  //   return {responses:  $('form').serializeArray(), id: this.state.form.properties.id};
  // },

  retrieveForm () {
    this.setState({form: FormStore.getFormInFocus()})
  },

  // submitResponses () {
  //   ResponseDatabaseActions.submitResponse(this.getResponses())
  // },

  render(){
    return (
      <main className="formContainer">
        { <h1> { this.state.form.properties.title } </h1> }
        { <p className="instructions"> {this.state.form.properties.instructions }</p> }
        <form>
        { this.drawFields() }
        </form>
        <button onClick={this.submitResponses}> Submit Responses </button>
      </main>
    );
  }

});


module.exports = Respond;
