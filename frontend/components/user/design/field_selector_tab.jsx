const React = require('react');

const FieldSelectorTab = React.createClass({
  addTarget (e){
    window.dragged = e.target;
  },
  removeTarget (e){
    setTimeout(function(){window.dragged = null;}, 500);
  },
  addField (type) {
    return (
      <li className="fieldChoice"
          id= {type}
          draggable="true"
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
          {this.addField("multiple choice")}
          {this.addField("checkbox")}
          {this.addField("dropdown")}
        </ul>
      </div>
    )
  }
});


module.exports = FieldSelectorTab;
