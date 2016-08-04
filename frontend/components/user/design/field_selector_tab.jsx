const React = require('react');

const FieldSelectorTab = React.createClass({
  addTarget (e){
    window.dragged = e.target;
  },
  removeTarget (e){
    setTimeout(function(){window.dragged = null;}, 500);
  },
  render () {
    return(
      <div className="designTab">
        <ul>
          <li className="fieldChoice"
              id="text"
              draggable="true"
              onDragStart={this.addTarget}
              onDragEnd={this.removeTarget}
          >text</li>
          <li className="fieldChoice">number</li>
        </ul>
      </div>
    )
  }
});


module.exports = FieldSelectorTab;
