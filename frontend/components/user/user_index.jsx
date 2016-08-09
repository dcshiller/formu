const React = require('react');
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../../stores/session_store');
const FormsStore = require('../../stores/forms_store.js');
const AuthActions = require('../../actions/auth_actions.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');

var newFormsListener;

const UserIndex = React.createClass({

  getInitialState () {
    let currentUser = SessionStore.currentUser();
    return {
      username: SessionStore.currentUser(),
      forms: FormsStore.getForms(currentUser)
    };
  },

  componentDidMount () {
    this.sessionStoreReceipt = SessionStore.addListener(this.processNewUser)
    this.formsStoreReceipt = FormsStore.addListener(this.processNewForms)
    FormDatabaseActions.getForms(this.state.username);
  },

  componentWillUnmount () {
    this.sessionStoreReceipt.remove();
    this.formsStoreReceipt.remove();
  },

  formLis () {
    let self = this;
    return this.state.forms.map(function(form, index){
      return (<li id={"form_item_" + index}
                  key={"form_item_" + index}
                  className="form_index_item">
                  <span id={"form_" + index + "_title"}> {form.title} </span>
                  <span id={"form_" + index + "_created_at"}> {form.created_at} </span>
                  <span id={"form_" + index + "_edit"}>
                    <button onClick={self.editFormHandler.bind(null, form.id)}>
                      Edit
                    </button>
                  </span>
                  <span id={"form_" + index + "_share"}> Share </span>
              </li>)
    });
  },

  processNewForms () {
    this.setState({forms: FormsStore.getForms() });
  },

  processNewUser () {
    this.setState({username: SessionStore.currentUser()})
    FormDatabaseActions.getForms(this.state.username);
  },

  newFormHandler () {
    FormDatabaseActions.clearForm();
    hashHistory.push(`${this.state.username}/design`);
  },

  editFormHandler (formId) {
    FormDatabaseActions.getForm(formId);
    hashHistory.push(`${this.state.username}/design`);
  },

  render () {
    return(
      <div className="userBox">
        <header className="header">
          <h2> Form Manager </h2>
          <button onClick={this.newFormHandler} id="newForm"> + New Form</button>
        </header>
          <div className="indexContainer">
            <h3> Your Forms </h3>
            <ul className="indexList container">
              { this.formLis() }
            </ul>
          </div>
      </div>
    )
  }

});


module.exports = UserIndex;
