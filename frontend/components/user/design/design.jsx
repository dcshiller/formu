const React = require('react')
const TabPane = require('./tab_pane')
const FormViewPane = require('./form_view_pane')

const Design = React.createClass({
  getInitialState(){
    return {form: {}}
  },
  changeForm(changes){
    const newForm = form;
    Object.keys(changes).forEach(key => newForm[key] = changes[key]);
    this.setState({form: newForm});
  },
  render(){
    return (
      <div className="paneContainer">
          <TabPane changeForm={this.changeForm}/>
          <FormViewPane/>
      </div>
    )
  }
})


module.exports = Design;
