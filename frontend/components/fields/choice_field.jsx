const React = require('react')

const ChoiceField = React.createClass({
  render () {
    let fieldVals = this.props.fieldVals;
    return (
        <div key = {`choice_div_${fieldVals.fieldId}`}>
         { fieldVals.choices.map(function(choice, index) {
          return (
            <label  htmlFor    =       { fieldVals.fieldId + "_choice_" + index + "_"  + choice.id  }
                    id         =       { fieldVals.fieldId + "_label_" + index + "_" + choice.id }
                    key        =       { fieldVals.fieldId + "_label_" + index + "_" + choice.id }
                    className  =       { fieldVals.fieldType + "choice" }
                   >
              { choice.choice_text }
              <input
                  type        =       { fieldVals.fieldType }
                  id          =       { fieldVals.fieldId + "_choice_" + index + "_" + choice.id}
                  key         =       { fieldVals.fieldId + "_choice_"  + index + "_" + choice.id}
                  name       =       { fieldVals.fieldId }
                  className   =       { fieldVals.className }
                  onChange    =       { fieldVals.handler }
                  onSelect    =       { fieldVals.onContainerClick }
                  value       =       { choice.id }
              />
            </label>
            )
            }
          )
          }
        </div>
    )
  }
});

module.exports = ChoiceField;
