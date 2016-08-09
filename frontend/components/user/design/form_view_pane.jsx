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
    setTimeout(function(){  $('.saveButton').text("Save Me");}, 1000);
  },

  addTarget (e) {
    e.preventDefault();
    window.dragged = e.target;
  },

  removeTarget (e){
    e.preventDefault();
    setTimeout(function(){window.dragged = null;}, 500);
  },

  dragOver (e) {
    e.preventDefault();
    if (e.target.className.indexOf("underDragged") === -1 &&
        e.target.className.indexOf("dropTarget") !== -1){e.target.className += " underDragged"}
  },

  dragLeave (e) {
    e.preventDefault();
    if (e.target.className.indexOf("underDragged") != -1)
    {e.target.className = "dropTarget"}
  },

  dropField (e) {
    e.preventDefault();
    this.dragLeave(e)
    let draggedObj = window.dragged;
    let position = e.target.id.split("_")[1]
    if (!draggedObj.className) {
      DesignActions.addField(draggedObj.replace(" ",""), position);
    }
    else if ("inputWrapper sectionTitle".includes(draggedObj.className)) {
      let fieldId = getIfDefined(draggedObj.getElementsByTagName("input")[0] , "id");
      fieldId = (fieldId || getIfDefined(draggedObj.getElementsByTagName("hr")[0], "id"));
      fieldId = (fieldId || getIfDefined(draggedObj, "id"));
      fieldId = fieldId.split("_")[0];
      DesignActions.repositionField(fieldId, position);
    }
  },

  drawField (fieldObj) {
   return (
            <div className ="formViewEntry">
              <img className = "deleteButton"
                  key={fieldObj.fieldId + "_deleteButton"}
                  onClick={DesignActions.deleteField.bind(null, fieldObj.fieldId)}
                  src={window.trashURL}
              />
                <Field fieldVals={ {
                    fieldName: fieldObj.Label || "New Field",
                    instructions: fieldObj.Instructions,
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
    let fieldId = e.target.id.split("_")[0];
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
          <h1 className="formTitle"> {this.props.form.properties.Title} </h1>
          <p>{this.props.form.properties.Description} </p>
          <hr/>
          {this.drawFields()}
          <button className="saveButton" onClick={this.saveForm}>
            {this.props.form.properties.id ? "Update Me" : "Save Me"}
          </button>
      </div>
    )
  }
});

module.exports = FormViewPane;
