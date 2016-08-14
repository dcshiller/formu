const React = require('react');
const FieldSelectorTab = require('./field_selector_tab');
const FieldPropertiesTab = require('./field_properties_tab');
const FormPropertiesTab = require('./form_properties_tab');
const Field = require('../../field');
const DesignActions = require('../../../actions/design_actions');

var TabPanes;

const TabPane = React.createClass({

  getInitialState () {
    return {paneSelected: 0}
  },

  componentWillReceiveProps () {
    if (this.props.field)
      {this.setState({paneSelected: 1})}
  },

  fieldBuilder (handler, fieldName, fieldType, fieldValue, options) {
    return (  <Field fieldVals={ { fieldName: fieldName,
                  hideLabel:  options && options.hideLabel,
                  handler: handler,
                  fieldType: fieldType,
                  fieldId: (this.props.field && this.props.field.id),
                  fieldValue: fieldValue}} />
    )
  },

  selectPane (tabNumber) {
    DesignActions.blurField();
    this.setState({paneSelected: tabNumber});
  },

  returnSelectedTab () {
    switch (this.state.paneSelected){
      case 0 :
        return (<FieldSelectorTab form={this.props.form}
                        changeHandler={this.props.changeHandler}
                        drop={this.props.drop}
                        drag={this.props.drag}/>)
                        break;
      case 1 :
        return ( <FieldPropertiesTab field={this.props.field}
                          form={this.props.form}
                          fieldBuilder={this.fieldBuilder}
                          changeHandler={this.props.changeHandler}/>)
                          break;
      case 2 :
        return (
          <FormPropertiesTab form={this.props.form}
            fieldBuilder={this.fieldBuilder}
            changeHandler={this.props.changeHandler}/>)
            break;
    }
  },

  tabclickhandler(paneNumber, e){
    e.preventDefault();
    this.selectPane(paneNumber);
  },

  newTab(labelText, paneNumber){
    return (
              <li onClick={ this.tabclickhandler.bind(null , paneNumber)}
                  className={this.state.paneSelected === paneNumber ? "inFocus" : "notInFocus" }
                  >
                  {labelText}
              </li>
          )
  },

  render(){
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
