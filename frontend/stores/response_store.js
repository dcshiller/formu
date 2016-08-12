const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants');

var _Response = [];

const ResponseStore = new Store(AppDispatcher);

ResponseStore.getResponse = function () {
  return _Response;
};

ResponseStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case CONSTS.SET_RESPONSE :
      _Response = payload.response;
      this.__emitChange();
    break;
  }

};

module.exports = ResponseStore;
