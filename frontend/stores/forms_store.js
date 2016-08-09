const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants');

const FormsStore = new Store(AppDispatcher);
var _Forms = []

FormsStore.getForms = function(){
  return _Forms;
}

FormsStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case CONSTS.SET_FORMS :
      _Forms = payload.forms;
      this.__emitChange();
    break;
  }

};


module.exports = FormsStore
