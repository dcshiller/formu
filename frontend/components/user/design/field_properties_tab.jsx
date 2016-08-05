const React = require('react');
const DesignActions = require('../../../actions/design_actions')


const FieldPropertiesTab = React.createClass({
  inputHandler (e) {
    e.preventDefault();
    DesignActions.changeFieldProperty(e.target.id, e.target.value);
    this.forceUpdate();
  },
  componentWillReceiveProps(){
    // this.forceUpdate();
  },
  render(){
    return(
      <div className="designTab">
        <form className="tabForm">
          { this.props.fieldBuilder("Label", "text", this.inputHandler, this.props.field["Label"] ) }
          { this.props.fieldBuilder("Instructions", "text", this.inputHandler, this.props.field["Instructions"]) }
       </form>
      </div>
    )
  }
});

module.exports = FieldPropertiesTab;
