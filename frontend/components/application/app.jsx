const React = require('react')
const Navbar = require('./navbar.jsx')
const SessionStore = require('../../stores/session_store.js')
const Splashbar = require('./splashbar.jsx')

const App = React.createClass({

  getInitialState(){
    return {user: SessionStore.currentUser() };},

  onChange(){
    this.setState({user: SessionStore.currentUser() })
  },

  componentDidMount(){
    this.sessionStoreReceipt = SessionStore.addListener(this.onChange);
  },

  componentWillUnmount(){
    this.sessionStoreReceipt.remove()
  },

  render(){
    return(
      <div className="applicationMain">
         <Navbar />
        {this.props.children}
      </div>
    )
  }
});


module.exports = App;
