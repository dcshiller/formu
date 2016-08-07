const React = require('react')

const Field = React.createClass({
      makeTextField () {
        let fieldVals = this.props.fieldVals;
        return (
            <input
              fieldName       =         { fieldVals["fieldName"] }
              id              =         { fieldVals["fieldId"] + "_input_" + fieldVals["fieldName"] }
              type            =         { (fieldVals["fieldType"] === "paragraph" && "textarea") ||
                                          fieldVals["fieldType"] }
              className       =         { (fieldVals["fieldType"] === "paragraph" &&
                                                    "paragraph " + fieldVals["className"]) ||
                                          fieldVals["className"] }
              onChange        =         { fieldVals["handler"] }
              onSelect        =         { fieldVals["onContainerClick"] }
              value           =         { fieldVals["fieldValue"] }
            />
          )
      },
      makeParagraphField () {
        let fieldVals = this.props.fieldVals;
        return (
            <textarea
              fieldName       =         { fieldVals["fieldName"] }
              id              =         { fieldVals["fieldId"] + "_input_" + fieldVals["fieldName"] }
              type            =         { (fieldVals["fieldType"] === "paragraph" && "textarea") ||
                                          fieldVals["fieldType"] }
              className       =         { (fieldVals["fieldType"] === "paragraph" &&
                                                    "paragraph " + fieldVals["className"]) ||
                                          fieldVals["className"] }
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
          case "paragraph" :
            return this.makeParagraphField();
          case "checkbox" :
          case "radio" :
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

         { fieldVals["fieldType"] == "rule" || fieldVals["hideLabel"] ||
          <label
                htmlFor       =       { fieldVals["fieldId"] }
                className     =       { fieldVals["fieldType"] }
                id            =       { fieldVals["fieldId"] + "_label"}
              >{fieldVals["fieldName"]}</label>
        }

        { fieldVals["fieldType"] == "rule" || (fieldVals["instructions"] &&
          <p className = "instructions"
              id={fieldVals["fieldId"]+"_instructions"}>
              {fieldVals["instructions"]}
          </p>)
        }

          {fieldVals["fieldType"] === "rule" && <hr/>}

          { fieldVals["fieldType"] !== "rule" && this.makeInputField() }
          </div>
         )
      }
})


module.exports = Field;
