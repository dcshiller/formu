const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');

const FormStore = Store.new(AppDispatcher);

const _Form = {};

FormStore.__onDispatch() = function(payload){
  switch (payload.actionType){
    case CONSTS.UPDATE_FORM;

  }

};


module.exports = FormStore;
