const React = require('react');
const Link = require('react-router').Link
const hashHistory = require('react-router').hashHistory
const AuthActions = require('../../actions/auth_actions.js');
const SessionStore = require('../../stores/session_store.js')
const ErrorStore = require('../../stores/error_store.js')

const Login = React.createClass({
  getInitialState () { return {username: "", password: "", errors: {}}},
  onChange(){
    let user = SessionStore.currentUser()
    if (user){hashHistory.push(user)}
  },
  componentDidMount() {
    $('body').css("background-image", "repeating-linear-gradient(  30deg, #3D3D3D 2px, #3D3D3D 2px, #1C1B1B 3px)");
    SessionStore.addListener(this.onChange);
    ErrorStore.addListener(this.newErrors);
  },
  componentWillUnmount() {
    $('body').css("background", "white");
  },
  newErrors(){
    this.setState({errors: ErrorStore.retrieveErrors()})
  },
  removeFieldErrors(field){
    let newErrors = this.state.errors;
    newErrors[field] = null;
    this.setState( {errors: newErrors});
  },
  inputHandler (e) {
    e.preventDefault();
    let newVals = {};
    this.removeFieldErrors(e.target.id);
    newVals[e.target.id] = e.target.value;
    this.setState( newVals )
  },
  login () {
    AuthActions.login(this.state)
  },
  loginAsGuest () {
    $("#username").val("Guest")
    $("#password").val("Password")
    setTimeout(AuthActions.login.bind(AuthActions , {username:"Guest", password:"Password"}), 600);
  },
  cancel () {
    hashHistory.push("/");
  },
  fieldErrors(fieldName){
    let thisFieldName = fieldName["fieldName"]
    if (this.state.errors[thisFieldName]){
        return (<span className="errorNote"> {this.state.errors[thisFieldName]} </span>);
    }
  },
  errorsPresent(fieldName){
    let thisFieldName = fieldName["fieldName"]
    if(this.state.errors[thisFieldName]){return "fieldBox yesErrors"}
    return "fieldBox noErrors";
  },
  formField(fieldName, fieldType){
    return (
      <div className={this.errorsPresent({fieldName})}>
        <label htmlFor={fieldName}>{fieldName}</label>
        <input type={fieldType}
                id={fieldName}
                onChange={this.inputHandler}
                value={this.state[{fieldName}]}/>
        {this.fieldErrors({fieldName})}
      </div>
  );
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
            <h2> It's FREE! </h2>
         </Link>
          <form className="login">
            <h2> Forμ Welcomes You! </h2>
            <span> Hey fellow form-builder, please log in. </span>
            <hr/>

            {this.formField("username", "text")}
            {this.formField("password", "password")}
            <button onClick={this.login}>Login</button>
            <button onClick={this.cancel}>Cancel</button>
          </form>
          <button onClick={this.loginAsGuest}> Login as Guest</button>
        </div>
      </div>
    )

  }
});

module.exports = Login;
