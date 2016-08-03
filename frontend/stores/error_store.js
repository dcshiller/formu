const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ErrorStore = new Store(AppDispatcher);

var _errors = [];

ErrorStore.replaceErrors = function(errors){
  _errors = JSON.parse(errors);
  this.__emitChange();
}

ErrorStore.retrieveErrors = function(){
  return _errors;
}

ErrorStore.__onDispatch = function(payload){
  switch (payload.actionType) {
  case CONSTS.ERROR :
    this.replaceErrors(payload.errors);
    break;
  }
};


module.exports = ErrorStore;
