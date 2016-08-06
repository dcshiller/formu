const React = require('react')

const Field = React.createClass({
      makeTextField () {
        let fieldVals = this.props.fieldVals;
        return (
            <input
              fieldName       =         { fieldVals["fieldName"] }
              id              =         { fieldVals["fieldId"] + "_input_" + fieldVals["fieldName"] }
              type            =         { fieldVals["fieldType"] }
              className       =         { fieldVals["className"] }
              onChange        =         { fieldVals["handler"] }
              onSelect        =         { fieldVals["onContainerClick"] }
              value           =         { fieldVals["fieldValue"] }
            />
          )
      },
      makeChoiceField () {
        let fieldVals = this.props.fieldVals;
        return (
          fieldVals.choices.map(function(choice) {
            return (
              <label  htmlFor    =       { fieldVals["fieldId"] + "_" + choice }
                      id         =       { fieldVals["fieldId"] + "_label_" + choice }
                      className  =       { fieldVals["fieldType"] + "choice" }
                     >
                {choice}
                <input
                    type        =       { fieldVals["fieldType"] }
                    id          =       { fieldVals["fieldId"] + "_choice_" + choice }
                    className   =       { fieldVals["className"] }
                    onChange    =       { fieldVals["handler"] }
                    onSelect    =       { fieldVals["onContainerClick"] }
                    value       =       { fieldVals["fieldValue"] || choice }
                />
              </label>
            )
            }
          )
        )
      },
      makeInputField () {
        switch (this.props.fieldVals.fieldType) {
          case "text" :
          case "number" :
            return this.makeTextField();
          case "checkbox" :
            return this.makeChoiceField();
          break;
        }
      },
      render () {
        let fieldVals = this.props.fieldVals;

        return (
          <div className      =       { fieldVals["selected"] ? "inputWrapper selected" : "inputWrapper" }
                draggable     =       { fieldVals["draggable"] }
                onDragStart   =       { fieldVals["onDragStart"] }
                onDragEnd     =       { fieldVals["onDragEnd"] }
                onClick       =       { fieldVals["onContainerClick"] }
                id            =       { fieldVals["fieldId"] + "_div" }>

          <label
                htmlFor       =       { fieldVals["fieldId"] }
                className     =       { fieldVals["fieldType"] }
                id            =       { fieldVals["fieldId"] + "_label"}
              >{fieldVals["fieldName"]}</label>
              { this.makeInputField() }
          </div>
         )
      }
})


module.exports = Field;
