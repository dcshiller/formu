const React = require('react')
const Field = require('../../field')

const FormViewPane = React.createClass({
  dragOver(e){
    e.preventDefault();
  },
  dropField(e){
    this.props.addField(window.dragged.id)
  },
  drawField(fieldObj){
   return (
            <Field fieldVals={ {
                fieldName: "NewField",
                fieldType: (fieldObj.type || "text"),
                compId: (fieldObj.compId),
                className: fieldObj.className,
                handler: null,
                readOnly: true,
                fieldValue: (fieldObj.val || "" )
            } }/>
          )
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
