const React = require('react')
const Field = require('../../field')
const DesignActions = require ('../../../actions/design_actions')
const FormDatabaseActions = require ('../../../actions/form_database_actions')
const ErrorStore = require('../../../stores/error_store');

const FormViewPane = React.createClass({

  componentDidMount () {
    this.setManualWindowSize();
    this.errorStoreReceipt = ErrorStore.addListener(this.checkSave);
    window.addEventListener("resize", this.setManualWindowSize, true);
  },

  componentWillUnmount () {
    this.errorStoreReceipt.remove();
    window.removeEventListener("resize", this.setManualWindowSize);
  },

  checkSave () {
    let messages = ErrorStore.retrieveErrors();
    let tempButtonText = messages["form"];
    $('.saveButton').text(tempButtonText + "!");
    setTimeout(function(){ $('.saveButton').text("Update Me")}, 1000);
  },

  addTarget (e) {
    window.dragged = e.target;
  },

  removeTarget (e) {
    setTimeout(function(){window.dragged = null;}, 500);
  },

  deleteField (fieldId, e) {
    FormDatabaseActions.deleteField(fieldId)
  },

  dragOver (e) {
    e.preventDefault();
    if (e.target.className.indexOf("underDragged") === -1 &&
        e.target.className.indexOf("dropTarget") !== -1){e.target.className += " underDragged"}
  },

  dragLeave (e) {
    if (e.target.className.indexOf("underDragged") != -1)
    {e.target.className = "dropTarget"}
  },

  dropField (e) {
    this.dragLeave(e)
    let draggedObj = window.dragged;
    let position = e.target.id.split("_")[1]
    if (!(draggedObj instanceof Object)) {
      DesignActions.addField(draggedObj.replace(" ",""), position);
    }
    else {
    let fieldId = draggedObj.id.split("_")[0];
    DesignActions.repositionField(fieldId, position);
     }
  },

  drawField (fieldObj) {

   return (
            <div className ="formViewEntry"
                 key={ fieldObj.id + "_outer_div" }
                 id={ fieldObj.id + "_outer_div" }
                 draggable={true}
                 onDragStart = {this.addTarget}
                 onDragEnd = {this.removeTarget}
                 onClick = {this.selectField} >
              <img className = "deleteButton"
                  key={fieldObj.id + "_deleteButton"}
                  onClick={this.deleteField.bind(null, fieldObj.id)}
                  src={window.trashURL}
              />
                <Field fieldVals={ {
                    fieldName: fieldObj.label || "New Field",
                    instructions: fieldObj.instructions,
                    fieldType: (fieldObj.type || "text"),
                    fieldId: (fieldObj.id || fieldObj.fieldId),
                    className: fieldObj.className || fieldObj.type,
                    selected:  this.props.field && fieldObj.id === this.props.field.id,
                    handler: null,
                    readOnly: true,
                    choices: fieldObj.choices,
                    onContainerClick: this.selectField,
                    fieldValue: (fieldObj.val || "" )
                  } }/>
            </div>
          )
  },

  drawDropTarget (number) {
    return (
      <div className = "dropTarget"
            id={"drop_" + number}
            key={"drop_" + number}
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

  setManualWindowSize () {
    let navbarSize = Math.min(Math.max(window.innerWidth*.8, 800), 1200);
    let tabPaneSize = Math.max(400, navbarSize*.35);
    let viewPaneSize = navbarSize - tabPaneSize - 56;
    $(".formViewPane").css("width", viewPaneSize);
  },

  selectField (e) {
    e.preventDefault();
    let fieldId;
    let idString = e.target.id.split("_")[0];
    if (idString.slice(0,4) != "TEMP")
      {fieldId = parseInt(idString);}
    else {fieldId = idString;}
    DesignActions.focusOnField(fieldId);
  },

  saveForm (e) {
    e.preventDefault();
    if (this.props.form.properties.id){
      FormDatabaseActions.updateForm(this.props.form);
    }
    else {
      FormDatabaseActions.saveForm(this.props.form);
    }
  },

  render () {
    return(
      <div className="formViewPane">
          <h1 className="formTitle"> {this.props.form.properties.title} </h1>
          <p>{this.props.form.properties.instructions} </p>
          <hr/>
          {this.drawFields()}
          <button className="saveButton" onClick={this.saveForm}>
            { this.props.form.properties.id ? "Update Me" : "Save Me" }
          </button>
      </div>
    )
  }
});

module.exports = FormViewPane;
