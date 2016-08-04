const React = require('react')
const TabPane = require('./tab_pane')
const FormViewPane = require('./form_view_pane')

var dragged_object = {};

const Design = React.createClass({
  getInitialState(){
    return {
            form: {
                    properties: {
                      Title: "Untitled Form",
                      Description: "This is a form. May it soon be awesome."
                    },
                    fields: [{type: "text"}]
            }
    }
  },
  addField(type, pos){
    let newId = Math.random() * 100000;
    let newField = {compId: newId, type: type, className: type};
    let updatedFields = this.state.form.fields.push(newField);
    this.setState({fields: updatedFields});
  },
  changeHandler(categoryToChange, changes, cB){
    const categoryDup = this.state.form[categoryToChange];
    Object.keys(changes).forEach(key => categoryDup[key] = changes[key]);
    const formDup = this.state.form;
    formDup[categoryToChange] = categoryDup;
    this.setState({form: formDup});
    cB && cB();
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
