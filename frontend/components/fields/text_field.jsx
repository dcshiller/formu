const React = require('react')

const TextField = React.createClass({
  render () {
    let fieldVals = this.props.fieldVals;
    if (fieldVals["fieldValue"]) {
      return(<input
                    id              =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    key             =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    type            =         { (fieldVals.fieldType === "paragraph" && "textarea") ||
                                                                            fieldVals.fieldType }
                    className       =         { (fieldVals.fieldType === "paragraph" &&
                                                                            "paragraph " + fieldVals.className) ||
                                                                            fieldVals.className }
                    onChange        =         { fieldVals.handler }
                    onSelect        =         { fieldVals.onContainerClick }
                    value           =         { fieldVals.fieldValue}
            />)
      }
    else {
      return (<input
                    id              =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    key              =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    type            =         { (fieldVals.fieldType === "paragraph" && "textarea") ||
                                                                                    fieldVals.fieldType }
                    className       =         { (fieldVals.fieldType === "paragraph" &&
                                                                            "paragraph " + fieldVals.className) ||
                                                                          fieldVals.className }
                    onChange        =         { fieldVals.handler }
                    onSelect        =         { fieldVals.onContainerClick }
              />)
      }
    }
});

module.exports = TextField;
