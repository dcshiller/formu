const React = require('react');
const DesignActions = require('../../../actions/design_actions')
const FormDatabaseActions = require('../../../actions/form_database_actions')
const Field = require('../../field')

const FieldPropertiesTab = React.createClass({

  addChoiceHandler (e) {
    e.preventDefault();
    DesignActions.addFieldChoice();
  },

  deleteChoiceHandler (choiceToDelete, e) {
    e.preventDefault();
    FormDatabaseActions.deleteChoice(choiceToDelete);
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
    let self = this;
    return(
      <div className="designTab">
        <form className="tabForm container">
          { !this.props.field && <p> Double click on a field on right to get started. </p> }

          { this.props.field &&
            fB_forFieldProps( "label",
                              "text",
                              this.props.field.label, {autoFocus: true} ) }
          { this.props.field && this.props.field.type !="section_title" &&
            fB_forFieldProps( "instructions",
                              "text",
                              this.props.field.instructions )}

          {this.props.field && "radio checkbox".includes(this.props.field.type) &&
            (
              <div className="choices">
              Choices
                {choices && choices.map(function(choice, index){
                    return (<div key={`Choice_${index}`}
                                className="choiceRow container">
                            {fB_forFieldChoices("choice_" + choice.id,
                                               "text",
                                               choice.choice_text,
                                              {hideLabel: true})
                                            }
                             <img className="choiceDeleteButton"
                                   onClick={self.deleteChoiceHandler.bind(null, choice.id)}
                                   src={window.trashURL}/>
                            </div>)
                })}
                <button id="addChoiceButton" onClick = { this.addChoiceHandler }> + </button>
              </div>
          )
          }
          {this.props.field &&
            <img className = "deleteButton"
            onClick={this.deleteFieldHandler.bind(null, this.props.field.id)}
            src={window.trashURL}
            />
          }
       </form>
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
