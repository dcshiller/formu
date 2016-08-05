const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const FormStore = new Store(AppDispatcher);
const CONSTS = require('../constants/constants');

const _Form = {
          properties: {
            Title: "Untitled Form",
            Description: "This is a form. May it soon be awesome."
          },
          fields: [{type: "text"}]
};

FormStore.getFormInFocus = function () {
  return _Form;
};

FormStore.addField = function (type, pos) {
  let newId = Math.random() * 100000;
  let newField = {compId: newId, type: type, className: type};
  let updatedFields = _Form.fields.slice(0,pos);
  updatedFields.push(newField);
  _Form.fields = updatedFields.concat(_Form.fields.slice(pos));
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
    case CONSTS.CHANGE_FORM_PROPERTY :
      this.changeFormProperty(payload.property_name, payload.new_value);
      break;
  }

};

module.exports = FormStore;
