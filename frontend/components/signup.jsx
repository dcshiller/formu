const React = require('react')
const AuthActions = require('../actions/auth_actions.js');
const ErrorStore = require('../stores/error_store.js')

const Signup = React.createClass({
  getInitialState () {
    return {  username: "",
              password: "",
              email: "",
              errors: {} }
  },
  inputHandler (e) {
    let newVals = {};
    this.removeFieldErrors(e.target.id);
    newVals[e.target.id] = e.target.value;
    this.setState( newVals );
  },
  newErrors(){
    this.setState({errors: ErrorStore.retrieveErrors()})
  },
  removeFieldErrors(field){
    let newErrors = this.state.errors;
    newErrors[field] = null;
    this.setState( {errors: newErrors});
  },
  componentDidMount(){
    ErrorStore.addListener(this.newErrors)
  },
  signup () {
    AuthActions.signup(this.state)
  },
  hideFieldNotes(){
   $('span.fieldNote').hide();
  },
  selectField(e){
    let fieldName = e.target.id
    let fieldNote = "#" + fieldName + "fieldNote"
    $(fieldNote).show();
  },
  fieldErrors(fieldName){
    if (this.state.errors[fieldName]){
        return (<span className="errorNote"> {this.state.errors[fieldName]} </span>);
    }
  },
  render(){
    return (
        <div className="signup">

        <h1>Create usable forms today*.</h1>

        <sidebar>
          <h2>Features</h2>

          <ul>
            <li>You can log in.</li>
            <li></li><li></li><li></li><li></li><li></li><li></li><li></li>
            <li>Stay tuned for more features.</li>
          </ul>
        </sidebar>

        <form className="signup">
          <div className="fieldLabel">
            <label htmlFor="email"> Email </label>
            <span className="fieldNote" id="emailfieldNote"> Your valid email </span>
          </div>
          <input type="text" id="email"
                  onSelect={this.selectField}
                  onBlur={this.hideFieldNotes}
                  onChange={this.inputHandler}
                  placeholder="Your email"
                  value={this.state.email}/>
         {this.fieldErrors("email")}


          <div className="fieldLabel">
            <label htmlFor="password"> Password </label>
            <span className="fieldNote" id="passwordfieldNote"> Minimum 6 characters </span>
          </div>
          <input type="password" id="password"
                onSelect={this.selectField}
                onBlur={this.hideFieldNotes}
                onChange={this.inputHandler}
                placeholder="Minimum 6 characters"
                value={this.state.password}/>
          {this.fieldErrors("password")}


          <div className="fieldLabel">
            <label htmlFor="username"> Username </label>
          </div>

          <input type="text"
                 id="username"
                 onChange={this.inputHandler}
                 placeholder="Your custom Forμ URL"
                 value={this.state.username}/>
          {this.fieldErrors("username")}
          <button onClick={this.signup}>SIGN UP FREE</button>
        </form>
        <p>*Or by 8/12</p>
      </div>
    )

  }
});

module.exports = Signup;
