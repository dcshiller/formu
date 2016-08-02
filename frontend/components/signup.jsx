const React = require('react')
const AuthActions = require('../actions/auth_actions.js');
const ErrorStore = require('../stores/error_store.js')

const Signup = React.createClass({
  getInitialState () { return {username: "", password: "", email: ""}},
  inputHandler (e) {
    // e.preventDefault();
    let newVals = {};
    newVals[e.target.id] = e.target.value;
    this.setState( newVals );
  },
  newError(){
    this.setState({errors: ErrorStore.retrieveErrors})
  },
  contentDidMount(){
    ErrorStore.addListener(this.newError)
  },
  signup () {
    AuthActions.signup(this.state)
  },
  selectField(e){
    let fieldName = e.target.id
    let fieldNote = "#" + fieldName + "fieldNote"
    $(fieldNote).show()
  },
  render(){
    return (
        <div className="signup">
        <form className="signup">
          <div className="fieldLabel">
            <label htmlFor="email"> Email </label>
            <span className="fieldNote" id="emailfieldNote"> Your valid email </span>
          </div>
          <input type="text" id="email" onSelect={this.selectField} onChange={this.inputHandler} value={this.state.email}/>
          <label htmlFor="password"> Password </label>
          <input type="password" id="password" onChange={this.inputHandler} value={this.state.password}/>
          <label htmlFor="username"> Username </label>
          <input type="text" id="username" onChange={this.inputHandler} value={this.state.username}/>
          <button onClick={this.signup}>SIGN UP FREE</button>
        </form>
      </div>
    )
  }
});

module.exports = Signup;
