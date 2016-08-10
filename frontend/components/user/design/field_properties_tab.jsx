const React = require('react');
const DesignActions = require('../../../actions/design_actions')
const FormDatabaseActions = require('../../../actions/form_database_actions')
const Field = require('../../field')

const FieldPropertiesTab = React.createClass({

  addChoiceHandler (e) {
    e.preventDefault();
    DesignActions.addFieldChoice();
  },

  deleteFieldHandler (fieldToDelete, e) {
    e.preventDefault();
    DesignActions.blurField();
    FormDatabaseActions.deleteField(fieldToDelete);
  },

  inputHandlerProp (e) {
    e.preventDefault();
    DesignActions.changeFieldProperty(e.target.id.split("_").pop(), e.target.value);
    this.forceUpdate();
  },

  inputHandlerChoice (e) {
    e.preventDefault();
    DesignActions.changeFieldChoice(e.target.id.replace(" ","_").split("_").pop(), e.target.value);
    this.forceUpdate();
  },

  render(){
    let choices = getIfDefined(this.props.field, "choices");
    let fB_forFieldProps = this.props.fieldBuilder.bind(null, this.inputHandlerProp)
    let fB_forFieldChoices = this.props.fieldBuilder.bind(null, this.inputHandlerChoice)
    return(
      <div className="designTab">
        <form className="tabForm">
          { !this.props.field && <p> Select a field on right to get started. </p> }

          { this.props.field &&
            fB_forFieldProps( "label",
                              "text",
                              this.props.field.label ) }
          { this.props.field &&
            fB_forFieldProps( "instructions",
                              "text",
                              this.props.field.instructions )}

          {this.props.field && "radio checkbox".includes(this.props.field.type) &&
            (
              <div className="choices">
              Choices
                { choices && choices.map(function(choice, index){
                    return fB_forFieldChoices("choice_" + choice.id,
                                               "text",
                                               choice.choice_text,
                                              {hideLabel: true});
                })}
                <button id="addChoiceButton" onClick = { this.addChoiceHandler }> + </button>
              </div>
          )
          }
       </form>
        {this.props.field &&
          <img className = "deleteButton"
               onClick={this.deleteFieldHandler.bind(null, this.props.field.id)}
               src={window.trashURL}
           />
         }
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
