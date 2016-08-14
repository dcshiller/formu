const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants');

const FormStore = new Store(AppDispatcher);
var _Form = {
          properties: {
            title: "Untitled Form",
            instructions: "This is a form. May it soon be awesome."
          },
          fields: [
                  ]
};

var _FieldInFocus = null;

FormStore.addField = function (type, pos) {
  let newId = "TEMP" + Math.floor(Math.random()*1000000000);//toString(36);
  let choices;
  if (type === "checkbox" || type ==="radio")
    {choices = [{choice_text: "choice 1",
                choice_position: 0,
                id: "TEMP" + Math.floor(Math.random()*1000000000)},
                {choice_text: "choice 2",
                  choice_position: 1,
                  id: "TEMP" + Math.floor(Math.random()*1000000000)}
                  ]}
  let newField = {id: newId,
                  type: type,
                  className: type,
                  choices: choices,
                  label: "New Label",
                  instructions: "Place your instructions here."};
  this.insertFieldAt(newField, pos);
  };

FormStore.addFieldChoice = function (){
  this.getFieldInFocus().choices.push({
                                       choice_text: "choice",
                                       choice_position: this.getFieldInFocus().choices.length,
                                       id: "TEMP" + Math.floor(Math.random()*100000000)
                                     });
  this.__emitChange();
};

FormStore.changeFieldChoice = function (choice_id, new_value) {
  this.getFieldInFocus().choices.forEach(
  function(choice){
    if (choice.id == choice_id)
      {choice.choice_text = new_value}
  }
  );
  this.__emitChange();
};

FormStore.changeFieldProperty = function (property_name, new_value) {
  this.getFieldInFocus()[property_name] = new_value;
  this.__emitChange();
};

FormStore.changeFormProperty = function (property_name, new_value) {
  _Form.properties[property_name] = new_value;
  this.__emitChange();
};

FormStore.clearForm = function () {
  _Form = {
          properties: {
            title: "Untitled Form",
            instructions: "This is a form. May it soon be awesome."
          },
          fields: []
  };
},

FormStore.deleteByFieldId = function (fieldId) {
  // let a = this.findPositionByFieldId(fieldId);
  this.deleteByFieldPosition(this.findPositionByFieldId(fieldId))
  this.__emitChange();
};

FormStore.deleteByChoiceId = function (choiceId) {
  _Form.fields.forEach(function(field){
    if(field.choices)
      { for(let i = 0; i < field.choices.length; i++){
          if (field.choices[i].id == choiceId) {
            field.choices.splice(i,1);
            i--;
          }
      }}
  }
  );
  this.__emitChange();
};

FormStore.deleteByFieldPosition = function (fieldPos) {
  _Form.fields.splice(fieldPos,1)
};

FormStore.findPositionByFieldId = function (fieldId) {
  let targetPosition = -1;
  for (let i = 0; i < _Form.fields.length; i++){
    if (_Form.fields[i] == undefined) {
       _Form.fields.splice(i, 1);
       i--;
     }
    if (_Form.fields[i].id == fieldId){
      targetPosition = i
    }
  }
  return targetPosition;
};

FormStore.findElementByFieldId  = function (fieldId) {
  return _Form.fields[this.findPositionByFieldId(fieldId)]
};

FormStore.getFieldInFocus = function () {
  return this.findElementByFieldId(_FieldInFocus);
};

FormStore.getFormInFocus = function () {
  return _Form;
};

FormStore.insertFieldAt = function (field, pos) {
  let updatedFields = _Form.fields.slice(0,pos);
  updatedFields.push(field);
  _Form.fields = updatedFields.concat(_Form.fields.slice(pos));
  this.__emitChange();
};

FormStore.repositionField = function (fieldId, pos) {
  fieldId = fieldId.slice && fieldId.slice(0,4) == "TEMP" ? fieldId : parseInt(fieldId);
  let fieldToBeMoved = this.findElementByFieldId(fieldId);
  let oldPos = this.findPositionByFieldId(fieldId);
  this.deleteByFieldId(fieldId);
  if (oldPos < pos) {pos = pos - 1}
  this.insertFieldAt(fieldToBeMoved, pos);
};

FormStore.setFormInFocus = function (form) {
  _Form = form;
   this.__emitChange();
};

FormStore.__onDispatch = function (payload) {

  switch (payload.actionType){

    case CONSTS.ADD_FIELD :
      this.addField(payload.type, payload.pos);
    break;

    case CONSTS.ADD_FIELD_CHOICE :
      this.addFieldChoice();
    break;

    case CONSTS.ADD_FORM_ID :
      _Form.properties.id = (_Form.properties.id || payload.id)
      this.__emitChange();
    break;

    case CONSTS.BLUR_FIELD :
      _FieldInFocus = null;//undefined;
      this.__emitChange();
    break;

    case CONSTS.CHANGE_FIELD_CHOICE :
      this.changeFieldChoice(payload.choice_number, payload.new_value);
    break;

    case CONSTS.CHANGE_FIELD_PROPERTY :
      this.changeFieldProperty(payload.property_name, payload.new_value);
    break;

    case CONSTS.CHANGE_FORM_PROPERTY :
      this.changeFormProperty(payload.property_name, payload.new_value);
    break;
    case CONSTS.CHOICE_DELETED :
      this.deleteByChoiceId(payload.choiceId);
    break;
    case CONSTS.CLEAR_FORM :
      this.clearForm();
    break

    case CONSTS.FIELD_DELETED :
      this.deleteByFieldId(payload.fieldId);
    break;

    case CONSTS.FOCUS_ON_FIELD :
      _FieldInFocus = payload.fieldId;
      this.__emitChange();
    break;

    case CONSTS.REPOSITION_FIELD :
      this.repositionField(payload.fieldId, payload.pos);
    break;

    case CONSTS.SET_FORM :
      this.setFormInFocus(payload.form)
    break;
  }

};

module.exports = FormStore;
