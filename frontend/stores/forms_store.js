const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants');

const FormsStore = new Store(AppDispatcher);
var _Forms = []

FormsStore.getForms = function () {
  return _Forms;
};

FormsStore.removeForm = function (id) {
  for(let i = 0; i < _Forms.length; i++)
  {
    if (parseInt(_Forms[i].id) == parseInt(id))
      {
        _Forms.splice(i,1);}
  }
  this.__emitChange();
};

FormsStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case CONSTS.FORM_DELETED :
      this.removeForm(payload.id)
      break;
    case CONSTS.SET_FORMS :
      _Forms = payload.forms;
      this.__emitChange();
    break;
  }
};


module.exports = FormsStore
