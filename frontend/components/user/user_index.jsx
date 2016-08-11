const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const SessionStore = require('../../stores/session_store');
const ErrorStore = require('../../stores/error_store');
const FormsStore = require('../../stores/forms_store.js');
const AuthActions = require('../../actions/auth_actions.js');
const EmailActions = require('../../actions/email_actions.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');
const Modal = require('react-modal');

var newFormsListener;

const customStyles = {
  content : {
    top                   : '20%',
    left                  : '35%',
    right                 : '35%',
    bottom                : '20%'
  }
};



const UserIndex = React.createClass({

  getInitialState () {
    let currentUser = SessionStore.currentUser();
    return {
      username: SessionStore.currentUser(),
      forms: FormsStore.getForms(currentUser),
      emailModal: false
    };
  },

  componentWillMount () {
    Modal.setAppElement('body');
  },

  componentDidMount () {
    this.sessionStoreReceipt = SessionStore.addListener(this.processNewUser)
    this.errorStoreReceipt = ErrorStore.addListener(this.processErrors)
    this.formsStoreReceipt = FormsStore.addListener(this.processNewForms)
    FormDatabaseActions.getForms(this.state.username);
  },

  componentWillUnmount () {
    this.sessionStoreReceipt.remove();
    this.formsStoreReceipt.remove();
    this.errorStoreReceipt.remove();
  },

  closeModal () {
    this.setState({emailModal: false});
  },

  deleteFormHandler (id, e) {
    e.preventDefault();
    FormDatabaseActions.deleteForm(id);
  },

  drawModal () {
   return (  <Modal
               isOpen={this.state.emailModal}
               onRequestClose={this.closeModal}
               style={customStyles}>
               <h2>Invitation for form {this.formModalChoice}</h2>
               <form id="emailInputForm">
                   <label for="emailinput">Recipient's email: </label>
                   <input id="emailinput" name="email" type="text"></input>
                   <label for="recipientinput">Recipient's name: </label>
                   <input id="recipientinput" name="recipient"></input>
                   <label for="senderinput">Your name: </label>
                   <input id="senderinput" name="sender"></input>
                   <label for="custominput">Custom message: </label>
                   <input id="custominput" name="custom_message"></input>
               </form>
               <button onClick={this.sendInvitation.bind(null, this.formModalChoice)}>send</button>
               <button onClick={this.closeModal}>close</button>
             </Modal> )
  },

  editFormHandler (formId) {
    FormDatabaseActions.getForm(formId);
    hashHistory.push(`${this.state.username}/design`);
  },

  formLis () {
    let self = this;
    return this.state.forms.map(function(form, index){
      return (
              <li id={`form_item_${index}`}
                  key={`form_item_${index}`}
                  className="form_index_item container">
                  <span id={"form_" + index + "_title"}> {form.title} </span>
                  <span id={"form_" + index + "_created_at"}> {form.created_at} </span>
                  <span id={"form_" + index + "_edit"}>
                    <Link to={`${self.state.username}/form/${form.id}`}> link</Link>, {" "}
                    <button onClick={self.editFormHandler.bind(null, form.id)}>
                      edit
                    </button>,
                      share
                  </span>
                  <span>
                    <button onClick={self.toggleResponse.bind(self, index)}>responses</button> ({form.responses.length})
                    { form.responses.length > 0 && self.state.forms[index].selected && (
                      <ul className="responseList">
                        { self.formResponseLis(form) }
                      </ul>)
                    }
                  </span>
                  <span id={"form_" + index + "_delete"}>
                    <img onClick={self.deleteFormHandler.bind(null, form.id)} src={window.trashURL}/>
                  </span>
              </li>
            )
    });
  },

  formResponseLis (form) {
    let self = this;
    if(!form.responses){return}
    return form.responses.map(function(response, index){
      return (<li id={"response_item_" + index}
                  key={"response_item_" + index}>
                  {<Link to={`${self.state.username}/form/${form.id}/${response.id}}`}> {response.created_at}</Link>}
              </li>)
    })
  },

  getEmailParams (form_id) {
    let email_form_entries = $('#emailInputForm').serializeArray();
    let form_path = `${this.state.username}/forms/`
    email_form_entries.push({name: "path", value: form_path});
    return {emailParams:  email_form_entries}
  },

  openModal (formChoice) {
    this.formModalChoice = formChoice;
    this.setState({modalIsOpen: true});
  },

  newFormHandler () {
    FormDatabaseActions.clearForm();
    hashHistory.push(`${this.state.username}/design`);
  },

  processErrors () {
    if (ErrorStore.retrieveErrors().email == "success")
      {this.setState({emailModal: false})}
  },

  processNewForms () {
    this.setState({forms: FormsStore.getForms() });
  },

  processNewUser () {
    this.setState({username: SessionStore.currentUser()})
    FormDatabaseActions.getForms(this.state.username);
  },

  sendInvitation () {
    EmailActions.sendInvitation(this.getEmailParams());
  },

  toggleResponse (form_number) {
    let new_selected_value = !this.state.forms[form_number].selected;
    let forms = this.state.forms;
    this.state.forms[form_number].selected = new_selected_value;
    this.setState({forms: forms})
  },

  render () {
    return(
      <div className="userBox">
        <header className="header">
          <h2> Form Manager </h2>
          <button onClick={this.newFormHandler} id="newForm">
            + New Form
          </button>
        </header>
          <div className="indexContainer">
            <h3> Your Forms </h3>
            <ul className="indexList container">
              { this.formLis() }
            </ul>
          </div>

          { this.drawModal() }

      </div>
    )
  }

});


module.exports = UserIndex;
