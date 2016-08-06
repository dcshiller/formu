const React = require('react');
const DesignActions = require('../../../actions/design_actions')
const Field = require('../../field')

const FieldPropertiesTab = React.createClass({
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
    let choices = (this.props.field && this.props.field.choices);
    let fB_forFieldProps = this.props.fieldBuilder.bind(null, this.inputHandlerProp)
    let fB_forFieldChoices = this.props.fieldBuilder.bind(null, this.inputHandlerChoice)
    return(
      <div className="designTab">
        <form className="tabForm">
          { !this.props.field && <p> Select a field on right to get started. </p> }

          { this.props.field &&
            fB_forFieldProps( "Label",
                              "text",
                              this.props.field && this.props.field["Label"] ) }
          { this.props.field &&
            fB_forFieldProps( "Instructions",
                              "text",
                              this.props.field && this.props.field["Instructions"]) }

          {choices &&
            (
              <div className="choices">
              Choices
                { choices.map(function(choice, index){
                    return fB_forFieldChoices("Choice " + index,
                                               "text",
                                               choices[index],
                                              {hideLabel: true});
                })}
                <button id="addChoiceButton" onClick = {DesignActions.addFieldChoice }> + </button>
              </div>
          )
          }
       </form>
        {this.props.field &&
          <img className = "deleteButton"
               onClick={DesignActions.deleteField.bind(null, this.props.field.fieldId)}
               src={window.trashURL}
           />
         }
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
