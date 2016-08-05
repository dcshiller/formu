const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');

module.exports = {
  addField(type, pos){
    AppDispatcher.dispatch({
        actionType: CONSTS.ADD_FIELD,
        type: type,
        pos: pos
    });
  },
  changeFormProperty(property_name, new_value){
    AppDispatcher.dispatch({
        actionType: CONSTS.CHANGE_FORM_PROPERTY,
        property_name: property_name,
        new_value: new_value
    });
  }

};
