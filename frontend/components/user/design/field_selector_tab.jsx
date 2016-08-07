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
  "section title": "h"
};

const FieldSelectorTab = React.createClass({
  addTarget (e) {
    window.dragged = this.typeTranslator(e.target.id)
  },
  typeTranslator (guiName) {
    return dictionary[guiName];
  },
  removeTarget (e){
    setTimeout(function(){window.dragged = null;}, 500);
  },
  createField (e) {
    let fieldType = this.typeTranslator(e.target.id);
    DesignActions.addField(fieldType, 100000) // note, this places the field at the end.
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
  render () {
    return(
      <div className="designTab">
        <ul>
          {this.addField("text")}
          {this.addField("number")}
          {this.addField("paragraph")}
          {this.addField("select one")}
          {this.addField("checkbox")}
          {this.addField("dropdown")}
          {this.addField("divider")}
          {this.addField("section title")}
        </ul>
      </div>
    )
  }
});


module.exports = FieldSelectorTab;
