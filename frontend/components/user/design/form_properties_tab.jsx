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
    DesignActions.changeFormProperty(propToChange, NewValue);
    this.forceUpdate();
  },

  render () {
    let fieldBuilder = this.props.fieldBuilder.bind(null, this.inputHandler)
    return(
      <div className="designTab">

        <form className="tabForm">
          { fieldBuilder("Title",
                          "text",
                          this.props.form.properties["Title"]) }
          { fieldBuilder( "Description",
                          "paragraph",
                          this.props.form.properties["Description"]) }
        </form>
      </div>
    )
  }
});


module.exports = FormPropertiesTab;
