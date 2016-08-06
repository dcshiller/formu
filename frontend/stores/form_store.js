const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const FormStore = new Store(AppDispatcher);
const CONSTS = require('../constants/constants');

const _Form = {
          properties: {
            Title: "Untitled Form",
            Description: "This is a form. May it soon be awesome."
          },
          fields: [{type: "text",
                    fieldId: "aaaaaa",
                    Label: "My Label",
                    Instructions: "My Instructions"}]
};

var _FieldInFocus = "aaaaaa";

FormStore.getFormInFocus = function () {
  return _Form;
};

FormStore.getFieldInFocus = function () {
  return this.findElementByFieldId(_FieldInFocus);
};

FormStore.addField = function (type, pos) {
  let newId = Math.floor(Math.random()*1000000000).toString(36);
  let newField = {fieldId: newId,
                  type: type,
                  className: type,
                  Label: "New Label",
                  Instructions: "Place your instructions here."};
  this.insertFieldAt(newField, pos);
  };

FormStore.insertFieldAt = function (field, pos) {
  let updatedFields = _Form.fields.slice(0,pos);
  updatedFields.push(field);
  _Form.fields = updatedFields.concat(_Form.fields.slice(pos));
  this.__emitChange();
};

FormStore.repositionField = function (fieldId, pos) {
  let fieldToBeMoved = this.findElementByFieldId(fieldId);
  let oldPos = this.findPositionByFieldId(fieldId)
  this.deleteByFieldId(fieldId);
  if (pos < oldPos) {pos}
  this.insertFieldAt(fieldToBeMoved, pos);
};

FormStore.findPositionByFieldId = function (fieldId) {
  let targetPosition = -1;
  _Form.fields.forEach(function(element, index){
    if (element.fieldId === fieldId){
      targetPosition = index;
    }
  })
  return targetPosition;
};

FormStore.findElementByFieldId  = function (fieldId) {
  return _Form.fields[this.findPositionByFieldId(fieldId)]
};

FormStore.deleteByFieldPosition = function (fieldPos) {
  _Form.fields.splice(fieldPos,1)
};

FormStore.deleteByFieldId = function (fieldId) {
  let a = this.findPositionByFieldId(fieldId);
  this.deleteByFieldPosition(this.findPositionByFieldId(fieldId))
};

FormStore.changeFieldProperty = function (property_name, new_value) {
  this.getFieldInFocus()[property_name] = new_value;
  this.__emitChange();
};

FormStore.changeFormProperty = function (property_name, new_value) {
  _Form.properties[property_name] = new_value;
  this.__emitChange();
};

FormStore.__onDispatch = function (payload) {
  switch (payload.actionType){
    case CONSTS.ADD_FIELD :
      this.addField(payload.type, payload.pos);
      break;
    case CONSTS.REPOSITION_FIELD :
      this.repositionField(payload.fieldId, payload.pos);
      break;
    case CONSTS.FOCUS_ON_FIELD :
      _FieldInFocus = payload.fieldId;
      this.__emitChange();
      break;
    case CONSTS.BLUR_FIELD :
      _FieldInFocus = null;//undefined;
      this.__emitChange();
      break;
    case CONSTS.CHANGE_FIELD_PROPERTY :
      this.changeFieldProperty(payload.property_name, payload.new_value);
      break;
    case CONSTS.CHANGE_FORM_PROPERTY :
      this.changeFormProperty(payload.property_name, payload.new_value);
      break;
  }
};

module.exports = FormStore;
