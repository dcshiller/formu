const React = require('react');
import { hashHistory, Link } from 'react-router'
const SessionStore = require('../../stores/session_store');
const ErrorStore = require('../../stores/error_store');
const FormsStore = require('../../stores/forms_store.js');
const AuthActions = require('../../actions/auth_actions.js');
const EmailActions = require('../../actions/email_actions.js');
const FormDatabaseActions = require('../../actions/form_database_actions.js');
const Modal = require('react-modal');

var newFormsListener;

const UserIndex = React.createClass({

  getInitialState () {
    let currentUser = SessionStore.currentUser();
    return {
      username: SessionStore.currentUser(),
      forms: FormsStore.getForms(currentUser),
      invitationModal: false,
      invitationResponseModal: false
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
    this.setState({invitationModal: false, invitationResponseModal: false});
  },

  deleteFormHandler (id, e) {
    e.preventDefault();
    FormDatabaseActions.deleteForm(id);
  },

  drawModal () {
   return (  <Modal
               className="emailModal"
               overlayClassName="emailModalOverlay"
               isOpen={this.state.invitationModal}
               onRequestClose={this.closeModal}
               >
               <h2>Invitation for form: <span className = "red"> {this.state.formModalChoiceTitle} </span> </h2>
               <form id="emailInputForm" className="container">
                <div className = "container">
                   <label htmlFor="emailinput">Recipient's email: </label>
                   <input id="emailinput" name="email" type="text"></input>
                </div>
                <div  className = "container">
                   <label htmlFor="recipientinput">Recipient's name: </label>
                   <input id="recipientinput" name="recipient"></input>
                </div>
                <div  className = "container">
                   <label htmlFor="senderinput">Your name: </label>
                   <input id="senderinput" name="sender"></input>
                </div>
                <div  className = "container">
                   <label htmlFor="custominput">Custom message: </label>
                   <textarea id="custominput" name="custom_message"></textarea>
                </div>
               </form>
               <button className="standardButton" onClick={this.sendInvitation.bind(null, this.state.formModalChoiceId)}>send</button>
               <button className="standardButton" onClick={this.closeModal}>close</button>
             </Modal> )
  },

  drawResponseModal () {
    const response = ErrorStore.retrieveErrors().email
    return (
      <Modal
        className="emailModal response"
        overlayClassName="emailModalOverlay"
        isOpen={this.state.invitationResponseModal}
        onRequestClose={this.closeModal}>
        <div onClick={this.closeModal}>
        { response == "delivered" &&
          <p>
            Your invitation has been sent to { ErrorStore.retrieveErrors().recipient }.
          </p>
        }
        { response == "invalid" &&
          <p>
            The address you entered is invalid.
          </p>
        }
        { response == "failure" &&
          <p>
            The invitation failed. Our engineers have been notified.
          </p>
        }

        </div>
      </Modal>
    )
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
                  <button onClick={self.invitationModalHandler.bind(null, form.id, form.title)}> <img src={envelopeURL}/></button>
                    <Link to={`${self.state.username}/form/${form.id}`}><img src={linkURL}/></Link>
                    <button onClick={self.editFormHandler.bind(null, form.id)}>
                      <img src={editURL}/>
                    </button>
                  </span>
                  <span>
                    <button onClick={self.toggleResponse.bind(self, index)} className="responsesButton">responses ({form.responses.length})</button> <br/>
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
                  <br/>
              </li>)
    })
  },

  getEmailParams (formId) {
    let emailFormEntries = $('#emailInputForm div *').serializeArray();
    let formPath = `formu.derekshiller.com/#/${this.state.username}/form/${formId}`
    emailFormEntries.push({name: "path", value: formPath});
    return {emailParams:  emailFormEntries}
  },

  invitationModalHandler (formId, formTitle) {
    this.setState({invitationModal: true, formModalChoiceId: formId, formModalChoiceTitle: formTitle })
  },

  newFormHandler () {
    FormDatabaseActions.clearForm();
    hashHistory.push(`${this.state.username}/design`);
  },

  processErrors () {
    let ResponseMessage = ErrorStore.retrieveErrors();
    if (ResponseMessage.email)
      {
        this.closeModal();
        this.setState({invitationResponseModal: true})
      }
  },

  processNewForms () {
    this.setState({forms: FormsStore.getForms() });
  },

  processNewUser () {
    this.setState({username: SessionStore.currentUser()})
    FormDatabaseActions.getForms(this.state.username);
  },

  sendInvitation (formId) {
    EmailActions.sendInvitation(this.getEmailParams(formId));
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
          { this.drawResponseModal() }
      </div>
    )
  }
});


module.exports = UserIndex;
