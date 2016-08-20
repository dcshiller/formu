const React = require('react');
import { hashHistory, Link } from 'react-router'
const AuthActions = require('../../actions/auth_actions.js');
const SessionStore = require('../../stores/session_store.js');
const ErrorStore = require('../../stores/error_store.js');
const Field = require('../field');

const Login = React.createClass({

  getInitialState () {
    if (getIfDefined(this.props, "location", "query", "user") === "Guest")
      {
        return {username: "Guest", password: "Password", errors: {}}
      }
    return {username: "", password: "", errors: {}}
  },

  componentDidMount () {
    $('body').css("background-image", "repeating-linear-gradient(  30deg, #3D3D3D 2px, #3D3D3D 2px, #1C1B1B 3px)");
    this.sessionStoreReceipt = SessionStore.addListener(this.onChange);
    this.errorStoreReceipt = ErrorStore.addListener(this.newErrors);
  },

  componentWillUnmount () {
    $('body').css("background", "rgb(255, 255, 245)");
    this.sessionStoreReceipt.remove();
    this.errorStoreReceipt.remove();
  },

  errorsPresent(fieldName){
    let thisFieldName = fieldName["fieldName"]
    if(this.state.errors[thisFieldName]){return "fieldBox yesErrors"}
    return "fieldBox noErrors";
  },

  fieldErrors(fieldName){
    let thisFieldName = fieldName["fieldName"]
    if (this.state.errors[thisFieldName]){
        return (<span className="errorNote"> {this.state.errors[thisFieldName]} </span>);
    }
  },

  formField(fieldName, fieldType){
    return (
      <div className={this.errorsPresent({fieldName})}>
        <Field fieldVals={ { fieldName: fieldName,
                      fieldType: fieldType,
                      handler: this.inputHandler,
                      fieldValue: this.state[fieldName]} } />
        {this.fieldErrors({fieldName})}
      </div>
    );
  },

  inputHandler (e) {
    e.preventDefault();
    let newVals = {};
    let fieldName =  e.target.id.split("_").pop();
    this.removeFieldErrors(fieldName);
    newVals[fieldName] = e.target.value;
    this.setState( newVals );
  },

  login (e) {
    e.preventDefault();
    AuthActions.login(this.state);
  },

  loginAsGuest (e) {
    e.preventDefault();
    $("#username").val("Guest");
    $("#password").val("Password");
    setTimeout(AuthActions.login.bind(AuthActions, {username:"Guest", password:"Password"}), 600);
  },

  newErrors () {
    if ( !this.isUnMounted )
      {
        this.setState( { errors: ErrorStore.retrieveErrors() } );
      }
  },

  onChange () {
    let userName = SessionStore.currentUser()
    if (userName){hashHistory.push("/users/" + userName)}
  },

  removeFieldErrors(field){
    let newErrors = this.state.errors;
    newErrors[field] = null;
    this.setState( {errors: newErrors});
  },


  render(){
    return (
      <div className="authformOuter">
        <div className="authformInner">
          <Link id="largeSignUp" to="signup">
            <h1> Don't have an account? </h1>
            <h2> Never fear.</h2>
            <hr/>
            <h1> Create one now. </h1>
          </Link>
          <form className="login">
            <h2> Forμ Welcomes You! </h2>
            <span> Hey fellow form-builder,

             log in and we'll build some forms. </span>
            <hr/>
            {this.formField("username", "text")}
            {this.formField("password", "password")}
            <button className="standardButton" onClick={this.login}>Login</button>
            <Link className="standardButton" to="/" >Cancel</Link>
            <button className="standardButton" onClick={this.loginAsGuest}> Login as Guest</button>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = Login;
