const React = require('react');
const DesignActions = require('../../../actions/design_actions')

const dictionary = {
  "text": "text",
  "number": "number",
  "paragraph": "paragraph",
  "select one": "radio",
  "checkbox": "checkbox",
  "dropdown": "dropdown",
  "divider": "rule",
  "section title": "section_title"
};

const FieldSelectorTab = React.createClass({

  addTarget (e) {
    window.dragged = this.typeTranslator(e.target.id)
  },

  addField (type) {
    return (
      <li className="fieldChoice"
          id= {type}
          draggable="true"
          onDoubleClick={this.createField}
          onDragStart={this.addTarget}
          onDragEnd={this.removeTarget}
      >{type}</li>
    )
  },

  createField (e) {
    let fieldType = this.typeTranslator(e.target.id);
    DesignActions.addField(fieldType, 100000) // note, this places the field at the end.
  },

  hideInstructions (e){
    $('.instructions').removeClass("visible");
  },

  removeTarget (e){
    setTimeout(function(){window.dragged = null;}, 500);
  },

  showInstructions (e){
    $('.instructions').addClass("visible")
  },

  typeTranslator (guiName) {
    return dictionary[guiName];
  },

  render () {
    return(
      <div className="designTab"
           onMouseOver={this.showInstructions}
           onMouseLeave={this.hideInstructions}>
        <ul className ="fieldSelectorGroups">
          <div className="fieldSelectorGroup container">
            {this.addField("text")}
            {this.addField("number")}
            {this.addField("paragraph")}
            {this.addField("select one")}
            {this.addField("checkbox")}
          </div>
          <div className="fieldSelectorGroup container ">
            {this.addField("divider")}
            {this.addField("section title")}
          </div>
        </ul>
        <p className="instructions"> Click or drag a field to add it to the form! </p>
      </div>
    )
  }
});


module.exports = FieldSelectorTab;
