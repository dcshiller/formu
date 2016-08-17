const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js')

const SessionStore = new Store(AppDispatcher);

var _currentUser = undefined // }; // {username: "GUEST"};

SessionStore._login = function (user) {
  _currentUser = user;
  this.__emitChange();
};

SessionStore._logout = function () {
  _currentUser = undefined;
  this.__emitChange();
};

SessionStore.currentUser = function() {
  return (getIfDefined(_currentUser,"username"));
};

SessionStore.isUserLoggedIn = function() {
  return !!_currentUser;
}

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case CONSTS.LOGIN :
    this._login(payload.user)
    break;
  case CONSTS.LOGOUT :
    this._logout()
    break;
  }
};

module.exports = SessionStore;
