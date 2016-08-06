const React = require('react')
const Field = require('../../field')
const DesignActions = require ('../../../actions/design_actions')

const FormViewPane = React.createClass({
  componentDidMount () {
    this.setManualWindowSize();
    window.addEventListener("resize", this.setManualWindowSize, true);
  },
  componentWillUnmount () {
    window.removeEventListener("resize", this.setManualWindowSize);
  },
  addTarget (e){
    window.dragged = e.target;
  },
  removeTarget (e){
    setTimeout(function(){window.dragged = null;}, 500);
  },
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
    if (window.dragged.className === "fieldChoice") {
      DesignActions.addField(window.dragged.id, position)
    }
    else if (window.dragged.className === "inputWrapper") {
      let fieldId = window.dragged.getElementsByTagName("input")[0].id;
      DesignActions.repositionField(fieldId, position)
    }
  },
  drawField(fieldObj){
   return (
            <Field fieldVals={ {
                fieldName: fieldObj.Label || "New Field",
                fieldType: (fieldObj.type || "text"),
                fieldId: (fieldObj.fieldId),
                className: fieldObj.className,
                selected:  this.props.field && fieldObj.fieldId === this.props.field.fieldId,
                handler: null,
                readOnly: true,
                draggable: true,
                choices: fieldObj.choices,
                onDragStart: this.addTarget,
                onDragEnd:this.removeTarget,
                onContainerClick: this.selectField,
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
    let i = 0;
    let fieldsWithDropTargets = [];
    arrayOfFields.forEach(function(field){
      fieldsWithDropTargets.push(self.drawDropTarget(i++));
      fieldsWithDropTargets.push(field);
    });
    fieldsWithDropTargets.push(self.drawDropTarget(i));
    return fieldsWithDropTargets;
  },
  setManualWindowSize(){
    let navbarSize = Math.min(Math.max(window.innerWidth*.8, 800), 1200);
    let tabPaneSize = Math.max(400, navbarSize*.35);
    let viewPaneSize = navbarSize - tabPaneSize - 60;
    $(".formViewPane").css("width", viewPaneSize);
  },
  selectField (e) {
    e.preventDefault();
    let fieldId = e.target.id.split("_")[0];
    // switch (e.target.tagName)
    // {
    //     case "INPUT" :
    //       fieldId = e.target.id
    //       break;
    //     case "DIV" :
    //       fieldId = e.target.getElementsByTagName("input")[0].id;
    //       break
    // }
    DesignActions.focusOnField(fieldId);
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
