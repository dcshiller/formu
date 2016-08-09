const React = require('react');
const Field = require('../../field');
const DesignActions = require('../../../actions/design_actions')

const FormPropertiesTab = React.createClass({

  componentDidMount () {
    $('.paragraph').keyup(function(e) {
      $(this).height(30);
      $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
    });
  },

  inputHandler (e) {
    e.preventDefault();
    let propToChange = e.target.id.split("_").pop();
    let newValue = e.target.value;
    DesignActions.changeFormProperty(propToChange, newValue);
    this.forceUpdate();
  },

  render () {
    let fieldBuilder = this.props.fieldBuilder.bind(null, this.inputHandler)
    return(
      <div className="designTab">

        <form className="tabForm">
          { fieldBuilder("title",
                          "text",
                          this.props.form.properties.title) }
          { fieldBuilder( "instructions",
                          "paragraph",
                          this.props.form.properties.instructions) }
        </form>
      </div>
    )
  }
});


module.exports = FormPropertiesTab;
