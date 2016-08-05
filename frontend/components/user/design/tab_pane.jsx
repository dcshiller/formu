const React = require('react');
const FieldSelectorTab = require('./field_selector_tab');
const FieldPropertiesTab = require('./field_properties_tab');
const FormPropertiesTab = require('./form_properties_tab');
const Field = require('../../field');
const DesignActions = require('../../../actions/design_actions');

var TabPanes;

const TabPane = React.createClass({
  getInitialState(){
    return {paneSelected: 0}
  },
  fieldBuilder(fieldName, fieldType, handler, fieldValue){
    return (
      <Field fieldVals={ { fieldName: fieldName,
                  fieldType: fieldType,
                  handler: handler,
                  fieldValue: fieldValue}} />
    )
  },
  selectPane (tabNumber) {
    DesignActions.blurField();
    this.setState({paneSelected: tabNumber})
  },
  componentWillReceiveProps () {
    if (this.props.field)
      {this.setState({paneSelected: 1})}
  },
  returnSelectedTab () {
    return TabPanes[this.state.paneSelected]
  },
  newTab(labelText, paneNumber){
    return (
              <li onClick={this.selectPane.bind(this,paneNumber)}
                  className={this.state.paneSelected === paneNumber ? "inFocus" : "notInFocus" }
                  >
                  {labelText}
              </li>
          )
  },
  render(){
    TabPanes = [
      <FieldSelectorTab form={this.props.form}
                        changeHandler={this.props.changeHandler}
                        drop={this.props.drop}
                        drag={this.props.drag}/>,
      <FieldPropertiesTab field={this.props.field}
                          form={this.props.form}
                          fieldBuilder={this.fieldBuilder}
                          changeHandler={this.props.changeHandler}/>,
      <FormPropertiesTab form={this.props.form}
                          fieldBuilder={this.fieldBuilder}
                          changeHandler={this.props.changeHandler}/>
    ];
    return (
      <div className="tabPane">
        <ul className="container">
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
