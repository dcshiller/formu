const React = require('react');
const FieldSelectorTab = require('./field_selector_tab')
const FieldPropertiesTab = require('./field_properties_tab')
const FormPropertiesTab = require('./form_properties_tab')

const TabPanes =  [
                    <FieldSelectorTab/>,
                    <FieldPropertiesTab/>,
                    <FormPropertiesTab/>
                  ]

const TabPane = React.createClass({
  getInitialState(){
    return {paneSelected: 0}
  },
  selectPane(tabNumber){
    this.setState({paneSelected: tabNumber})
  },
  returnSelectedTab(){
    return TabPanes[this.state.paneSelected]
  },
  newTab(labelText, paneNumber){
    return (
              <li onClick={this.selectPane.bind(this,paneNumber)}
                  className={this.state.paneSelected === paneNumber ? "inFocus" : "notInFocus" }
                  changeForm={this.props.changeForm}>
                  {labelText}
              </li>
          )
  },
  render(){
    return (
      <div className="tabPane">
        <ul>
          {this.newTab("Add a field", 0)}
          {this.newTab("Field properties", 1)}
          {this.newTab("Form properties", 2)}
        </ul>
        { this.returnSelectedTab() }
      </div>
    );
  }
});


module.exports = TabPane;
