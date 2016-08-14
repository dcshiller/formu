const React = require('react');
const TextField = require('./fields/text_field');
const ParagraphField = require('./fields/paragraph_field');
const ChoiceField = require('./fields/choice_field');
const SectionTitle = require('./fields/section_title');
const Rule = require('./fields/rule');


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
            return (<ParagraphField fieldVals={this.props.fieldVals}/>); // this.makeParagraphField();
          case "checkbox" :
          case "radio" :
            return (<ChoiceField fieldVals={this.props.fieldVals}/>)
          // return this.makeChoiceField();
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
        let identifier =  fieldVals.fieldId + "_div_" + nestLevel + "_" + Math.random();
        return (<div className      =       { (nestLevel > 1 && " ") ||
                                              (fieldVals.selected ? "inputWrapper selected" : "inputWrapper") }
                      onClick       =       { fieldVals.onContainerClick }
                      id            =       { identifier }
                      key           =       { identifier }>
                      { content1 }
                      { content2 }
                </div> )
      },

      // draggable     =       { fieldVals.draggable }
      // onDragStart   =       { fieldVals.onDragStart }
      // onDragEnd     =       { fieldVals.onDragEnd }

      render () {
        let fieldVals = this.props.fieldVals;
        return (
          this.wrapDiv(1, this.wrapIfNecessary() )
         )
      }
})

module.exports = Field;
