const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');

module.exports = {

  addField (type, pos) {
    AppDispatcher.dispatch({
        actionType: CONSTS.ADD_FIELD,
        type: type,
        pos: pos
    });
  },

  addFieldChoice () {
    AppDispatcher.dispatch({
        actionType: CONSTS.ADD_FIELD_CHOICE,
    });
  },

  blurField () {
    AppDispatcher.dispatch({
          actionType: CONSTS.BLUR_FIELD,
        });
  },

  changeFieldChoice (choice_number, new_value) {
    AppDispatcher.dispatch({
        actionType: CONSTS.CHANGE_FIELD_CHOICE,
        choice_number: choice_number,
        new_value: new_value
    });
  },

  changeFieldProperty (property_name, new_value) {
    AppDispatcher.dispatch({
        actionType: CONSTS.CHANGE_FIELD_PROPERTY,
        property_name: property_name,
        new_value: new_value
    });
  },

  changeFormProperty (property_name, new_value) {
    AppDispatcher.dispatch({
        actionType: CONSTS.CHANGE_FORM_PROPERTY,
        property_name: property_name,
        new_value: new_value
    });
  },

  focusOnField (fieldId) {
    AppDispatcher.dispatch({
      actionType: CONSTS.FOCUS_ON_FIELD,
      fieldId: fieldId
    });
  },

  repositionField (fieldId, pos) {
    AppDispatcher.dispatch({
          actionType: CONSTS.REPOSITION_FIELD,
          fieldId: fieldId,
          pos: pos
      });
  }

};
