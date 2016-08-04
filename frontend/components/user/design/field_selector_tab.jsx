const React = require('react');

const FieldSelectorTab = React.createClass({
  render(){
    return(
      <div className="designTab">
        <ul>
          <li className="fieldChoice">text</li>
          <li className="fieldChoice">number</li>
        </ul>
      </div>
    )
  }
});


module.exports = FieldSelectorTab;
