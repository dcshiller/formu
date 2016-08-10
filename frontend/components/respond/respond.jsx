
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../../stores/session_store');
const FormStore = require('../../stores/form_store.js');
const AuthActions = require('../../actions/auth_actions.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');

const Respond = React.createClass({

  getInitialState () {
    return {form: FormStore.getFormInFocus();}
  },

  componentDidMount () {
    this.formStoreReceipt = FormStore.addListener(this.retrieveForm);
  },

  componentWillUnmount () {
    this.formStoreReceipt.remove();
  };

  drawField (fieldObj) {
     return (
        <Field fieldVals={ {
            fieldName: fieldObj.label || " ",
            instructions: fieldObj.instructions,
            fieldType: (fieldObj.type),
            fieldId: (fieldObj.id || fieldObj.fieldId),
            className: fieldObj.className || fieldObj.type,
            choices: fieldObj.choices,
            onContainerClick: this.selectField,
            fieldValue: (fieldObj.val || "" )
          } }/>
        )
},

  retrieveForm () {
    this.setState({form: FormStore.getFormInFocus();})
  },

  render(){
    <main className="formContainer">

    </main>
  }

});


module.exports = Respond;
