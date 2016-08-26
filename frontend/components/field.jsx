const React = require('react');
import { TextField, ParagraphField, ChoiceField, SectionTitle, Rule } from './fields/field_hub.js';

const Field = React.createClass({

      addLabelAndInstructions () {
        let fieldVals = this.props.fieldVals;
        return (
          this.wrapDiv(3,
            ( fieldVals["hideLabel"] ||
              <label
                   htmlFor       =       { fieldVals.fieldId }
                   className     =       { fieldVals.fieldType + " inputLabel" }
                   id            =       { fieldVals.fieldId  + "_label"}
                   key           =       { fieldVals.fieldId  + "_label"}
                 >{fieldVals["fieldName"]}</label>
            ),

            (fieldVals["instructions"] &&
               <p className = "instructions"
                   id={fieldVals.fieldId + "_instructions" + fieldVals.fieldName}
                   key={fieldVals.fieldId + "_instructions" + fieldVals.fieldName}
                   >
                   {fieldVals["instructions"]}
               </p>
             )
          )
        )
      },

      wrapIfNecessary () {
        switch (this.props.fieldVals.fieldType) {
          case "text" :
          case "number" :
          case "password" :
          case "paragraph" :
          case "checkbox" :
          case "radio" :
            return (
              this.wrapDiv(2, this.addLabelAndInstructions(), this.directToProperInputMaker())
            );
          case "rule" :

          case "section_title" :
            return this.directToProperStructuralElementMaker();
          break;
        }
      },

      directToProperInputMaker () {
        switch (this.props.fieldVals.fieldType) {
          case "text" :
          case "number" :
          case "password" :
            return (<TextField fieldVals={this.props.fieldVals}/>);
          case "paragraph" :
            return (<ParagraphField fieldVals={this.props.fieldVals}/>);
          case "checkbox" :
          case "radio" :
            return (<ChoiceField fieldVals={this.props.fieldVals}/>)
        }
      },

      directToProperStructuralElementMaker () {
        switch (this.props.fieldVals.fieldType) {
          case "section_title" :
            return (<SectionTitle fieldVals={this.props.fieldVals}/>)
          case "rule" :
            return (<Rule fieldVals={this.props.fieldVals}/>)
        }
      },

      wrapDiv(nestLevel, content1, content2) {
        let fieldVals = this.props.fieldVals;
        let identifier =  fieldVals.fieldId + "_div_" + nestLevel + "_";
        return (<div className      =       { (nestLevel > 1 && " ") ||
                                              (fieldVals.selected ? "inputWrapper selected" : "inputWrapper") + " container " }
                      onClick       =       { fieldVals.onContainerClick }
                      id            =       { identifier }
                      key           =       { identifier }>
                      { content1 }
                      { content2 }
                </div> )
      },

      render () {
        let fieldVals = this.props.fieldVals;
        return (
          this.wrapDiv(1, this.wrapIfNecessary() )
         )
      }
})

module.exports = Field;
