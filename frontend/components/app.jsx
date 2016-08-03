const React = require('react')
const Navbar = require('./navbar.jsx')
const SessionStore = require('../stores/session_store.js')
const Splashbar = require('./splashbar.jsx')

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
        {this.props.children}
      </div>
    )
  }

});


module.exports = App;
