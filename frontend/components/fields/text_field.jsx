const React = require('react')

const TextField = React.createClass({
  componentDidMount: function () {
    if (this.props.fieldVals.autoFocus){this.refs.autoFocus.focus();}
  },
  render () {
    let fieldVals = this.props.fieldVals;
    if (fieldVals["fieldValue"]) {
      return(<input
                    id              =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    key             =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    name              =       { fieldVals.fieldId }
                    type            =         { fieldVals.fieldType }
                    className       =         { fieldVals.className }
                    onChange        =         { fieldVals.handler }
                    onSelect        =         { fieldVals.onContainerClick }
                    value           =         { fieldVals.fieldValue }
                    ref             =         { fieldVals.autoFocus && "autoFocus" }
            />)
      }
    else {
      return (<input
                    id              =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    key             =         { fieldVals.fieldId + "_input_" + fieldVals.fieldName }
                    type            =         { fieldVals.fieldType }
                    name              =         { fieldVals.fieldId }
                    className       =         { fieldVals.className }
                    onChange        =         { fieldVals.handler }
                    onSelect        =         { fieldVals.onContainerClick }
              />)
      }
    },
});

module.exports = TextField;
