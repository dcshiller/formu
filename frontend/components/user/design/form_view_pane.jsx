const React = require('react')
const Field = require('../../field')
const DesignActions = require ('../../../actions/design_actions')

const FormViewPane = React.createClass({
  dragOver(e){
    e.preventDefault();
    if (e.target.className.indexOf("underDragged") === -1 &&
        e.target.className.indexOf("dropTarget") !== -1){e.target.className += " underDragged"}
  },
  dragLeave(e){
    e.preventDefault();
    if (e.target.className.indexOf("underDragged") != -1)
    {e.target.className = "dropTarget"}
  },
  dropField(e){
    this.dragLeave(e)
    let position = e.target.id.split("_")[1]
    DesignActions.addField(window.dragged.id, position)
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
  drawDropTarget(number){
    return (
      <div className = "dropTarget"
            id={"drop_" + number}
            onDragOver={this.dragOver}
            onDragLeave={this.dragLeave}
            onDrop={this.dropField}/>
    )
  },
  drawFields () {
    let self = this;
    let arrayOfFields = this.props.form.fields.map(function(field){
      return  (
                self.drawField(field)
              )
    })
    let fieldsWithDropTargets = [];
    let i = 0;
    arrayOfFields.forEach(function(field){
      fieldsWithDropTargets.push(self.drawDropTarget(i++));
      fieldsWithDropTargets.push(field);
    });
    fieldsWithDropTargets.push(self.drawDropTarget(i));
    return fieldsWithDropTargets;
  },
  render(){
    return(
      <div className="formViewPane">
          <h1 className="formTitle"> {this.props.form.properties["Title"]} </h1>
          <p>{this.props.form.properties["Description"]} </p>
          <hr/>
          {this.drawFields()}
      </div>
    )
  }
});

module.exports = FormViewPane;
