const React = require('react')

const Field = React.createClass({

      makeTextField () {
        let fieldVals = this.props.fieldVals;
        if (fieldVals["fieldValue"]) {
          return (<input
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
        // fieldName       =         { fieldVals["fieldName"] }
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
      },

      makeParagraphField () {
        let fieldVals = this.props.fieldVals;
        return (
            <textarea
              fieldName       =         { fieldVals.fieldName }
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
      },

      makeChoiceField () {
        let fieldVals = this.props.fieldVals;
        return (
          fieldVals.choices.map(function(choice) {
            return (
              <label  htmlFor    =       { fieldVals.fieldId + "_" + choice }
                      id         =       { fieldVals.fieldId + "_label_" + choice }
                      key        =       { fieldVals.fieldId + "_label_" + choice }
                      className  =       { fieldVals.fieldType + "choice" }
                     >
                {choice}
                <input
                    type        =       { fieldVals.fieldType }
                    id          =       { fieldVals.fieldId + "_choice_" + choice }
                    key         =       { fieldVals.fieldId + "_choice_" + choice }
                    className   =       { fieldVals.className }
                    onChange    =       { fieldVals.handler }
                    onSelect    =       { fieldVals.onContainerClick }
                    value       =       { fieldVals.fieldValue || choice }
                />
              </label>
            )
            }
          )
        )
      },

      addLabelAndInstructions () {
        let fieldVals = this.props.fieldVals;
        return (
          <div>
            { fieldVals["hideLabel"] ||
             <label
                   htmlFor       =       { fieldVals.fieldId }
                   className     =       { fieldVals.fieldType }
                   id            =       { fieldVals.fieldId + "_label"}
                 >{fieldVals["fieldName"]}</label>
            }

            { (fieldVals["instructions"] &&
               <p className = "instructions"
                   id={fieldVals.fieldId+"_instructions"}>
                   {fieldVals["instructions"]}
               </p>)
            }
          </div>
        )
      },

      makeSectionTitle () {
        return (
          <h1 id = { this.props.fieldVals.fieldId + "_title"}
              key = { this.props.fieldVals.fieldId + "_title"}
              className = "sectionTitle"
              > { this.props.fieldVals.fieldName }</h1>
        )
      },

      makeRule () {
         return (<hr id = { this.props.fieldVals.fieldId + "_rule" }
                    key = { this.props.fieldVals.fieldId + "_rule" }
                 />)
      },

      directToProperDirector () {
        switch (this.props.fieldVals.fieldType) {
          case "text" :
          case "number" :
          case "password" :
          case "paragraph" :
          case "checkbox" :
          case "radio" :
            return (
              <div>
                { this.addLabelAndInstructions() }
                { this.directToProperInputMaker() }
              </div>
            );
          case "rule" :

          case "h" :
            return this.directToProperStructuralElementMaker();
          break;
        }
      },

      directToProperInputMaker () {
        switch (this.props.fieldVals.fieldType) {
          case "text" :
          case "number" :
          case "password" :
            return this.makeTextField();
          case "paragraph" :
            return this.makeParagraphField();
          case "checkbox" :
          case "radio" :
          return this.makeChoiceField();
        }
      },

      directToProperStructuralElementMaker () {
        switch (this.props.fieldVals.fieldType) {
          case "h" :
            return this.makeSectionTitle();
          case "rule" :
            return this.makeRule();
        }
      },

      render () {
        let fieldVals = this.props.fieldVals;
        return (
          <div className      =       { fieldVals.selected ? "inputWrapper selected" : "inputWrapper" }
                draggable     =       { fieldVals.draggable }
                onDragStart   =       { fieldVals.onDragStart }
                onDragEnd     =       { fieldVals.onDragEnd }
                onClick       =       { fieldVals.onContainerClick }
                id            =       { fieldVals.fieldId + "_div" }
                key            =       { fieldVals.fieldId + "_div" }>
          { this.directToProperDirector() }
          </div>
         )
      }
})

module.exports = Field;
