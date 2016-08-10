const React = require('react')

const ParagraphField = React.createClass({
  render () {
    let fieldVals = this.props.fieldVals;
    return (
              <textarea
                id              =         { fieldVals.fieldId + "_input_" + fieldVals["fieldName"] }
                key              =         { fieldVals.fieldId + "_input_" + fieldVals["fieldName"] }
                type            =         { (fieldVals.fieldType === "paragraph" && "textarea") ||
                                            fieldVals.fieldType }
                className       =         { (fieldVals.fieldType === "paragraph" &&
                                                      "paragraph " + fieldVals.className) ||
                                            fieldVals.className }
                onChange        =         { fieldVals.handler }
                onSelect        =         { fieldVals.onContainerClick }
                value           =         { fieldVals.fieldValue }
              />
            )

  }
});
// fieldName       =         { fieldVals.fieldName }

module.exports = ParagraphField;
