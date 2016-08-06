const React = require('react');
const DesignActions = require('../../../actions/design_actions')


const FieldSelectorTab = React.createClass({
  addTarget (e){
    window.dragged = e.target;
  },
  removeTarget (e){
    setTimeout(function(){window.dragged = null;}, 500);
  },
  createField (e) {
    DesignActions.addField(e.target.id, 100000)
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
          {this.addField("radio")}
          {this.addField("checkbox")}
          {this.addField("dropdown")}
        </ul>
      </div>
    )
  }
});


module.exports = FieldSelectorTab;
