const React = require('react');
const TabPane = require('./tab_pane');
const FormViewPane = require('./form_view_pane');
const FormStore = require('../../../stores/form_store');
const DesignActions = require('../../../actions/design_actions');

var dragged_object = {};

const Design = React.createClass({

  getInitialState () {
    return { form: FormStore.getFormInFocus(), field: FormStore.getFieldInFocus()    }
  },

  componentDidMount () {
    this.formStoreReceipt = FormStore.addListener(this.newFormProcessor);
  },

  componentWillUnmount () {
    this.formStoreReceipt.remove();
  },

  newFormProcessor () {
    // let newField = {field: FormStore.getFieldInFocus()};
    this.setState({field: FormStore.getFieldInFocus()});
    this.setState({form: FormStore.getFormInFocus()});
    // this.setState(newField)
  },

  drag (object_to_drag) {
    dragged_object = object_to_drag;
  },

  drop (place_to_drop) {
    // if (dragged_object)
  },

  render () {
    return (
      <div className="paneContainer container" >

          <TabPane  form={this.state.form}
                    field={this.state.field}
                    changeHandler={this.changeHandler}
                    drag={this.drag}
                    drop={this.drop}/>

          <FormViewPane form={this.state.form}
                        field={this.state.field}
                        addField={this.addField}/>

      </div>
    )
  }
})


module.exports = Design;
