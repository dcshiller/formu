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
          { this.props.field &&
            fB_forFieldProps( "Label",
                              "text",
                              this.props.field && this.props.field["Label"] ) }
          { this.props.field &&
            fB_forFieldProps( "Instructions",
                              "text",
                              this.props.field && this.props.field["Description"]) }

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
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
