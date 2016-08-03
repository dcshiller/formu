const React = require('react')
const Navbar = require('./navbar.jsx')
const SessionStore = require('../stores/session_store.js')

const App = React.createClass({
  getInitialState(){
    return {user: SessionStore.currentUser() };},
  onChange(){
    this.setState({user: SessionStore.currentUser() })
  },
  componentDidMount(){
    SessionStore.addListener(this.onChange);
  },
  render(){
    return(
      <div >
         <Navbar />
         <div className="skyskape">
         clouds go here
         </div>
         Hello, {this.state.user}
        {this.props.children}
      </div>
    )
  }

});


module.exports = App;
