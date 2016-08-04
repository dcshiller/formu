const React = require('react')
const Field = require('../../field')


const FormViewPane = React.createClass({
  dragOver(e){
    e.preventDefault();
  },
  dropField(e){
    switch (window.dragged.id) {
      case "textFieldSelector" :
      this.props.addField("text")
      break;
    }
  },
  drawField(fieldObj){
    switch (fieldObj.type) {
      case "text" :
       return    ( <Field fieldVals={ { fieldName: "NewField",
                    fieldType: "text",
                    handler: null,
                    fieldValue: ""}} /> )
    break;
    }
  },
  drawFields () {
    let self = this;
    return this.props.form.fields.map(function(field){
      return self.drawField(field)
    })
  },
  render(){
    return(
      <div className="formViewPane" onDragOver={this.dragOver} onDrop={this.dropField}>
          <h1 className="formTitle"> {this.props.form.properties["Title"]} </h1>
          <p>{this.props.form.properties["Description"]} </p>
          <hr/>
          {this.drawFields()}
      </div>
    )
  }
});

module.exports = FormViewPane;
