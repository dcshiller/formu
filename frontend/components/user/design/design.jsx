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
    FormStore.addListener(this.onChange);
  },
  onChange () {
    this.setState({ form: FormStore.getFormInFocus(), field: FormStore.getFormInFocus()})
  },
  // changeHandler(categoryToChange, changes, cB){ // for textfields
  //   const categoryDup = this.state.form[categoryToChange];
  //   Object.keys(changes).forEach(key => categoryDup[key] = changes[key]);
  //   const formDup = this.state.form;
  //   formDup[categoryToChange] = categoryDup;
  //   this.setState({form: formDup});
  //   cB && cB();
  // },
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
                        addField={this.addField}/>
      </div>
    )
  }
})


module.exports = Design;
