const React = require('react')

const ParagraphField = React.createClass({
  render () {
    let fieldVals = this.props.fieldVals;
    return (
              <textarea
                id              =         { fieldVals.fieldId + "_input_" + fieldVals["fieldName"] }
                name            =         { fieldVals.fieldId }
                key             =         { fieldVals.fieldId + "_input_" + fieldVals["fieldName"] }
                type            =         "textarea" 
                className       =         { "paragraph " + fieldVals.className }
                onChange        =         { fieldVals.handler }
                onSelect        =         { fieldVals.onContainerClick }
                value           =         { fieldVals.fieldValue }
              />
            )

  }
});

module.exports = ParagraphField;
