const AppDispatcher = require('../dispatcher/dispatcher.js');
const ApiAuthUtils = require('../utils/api_auth_utils.js')
const CONSTS = require('../constants/constants.js');

const AuthActions = {

  login(user){
    ApiAuthUtils.login(user, this.loginUser, this.logoutUser)
  },

  signup(user){
    ApiAuthUtils.createUser(user, this.loginUser, this.errorMessage)
  },

  loginUser(user){
    AppDispatcher.dispatch({
      actionType: CONSTS.LOGIN,
      user: user
    })
  },

  logoutUser(){
    AppDispatcher.dispatch({
      actionType: CONSTS.LOGOUT
    })
  },

  errorMessage(message){
    AppDispatcher.dispatch({
      actionType: CONSTS.ERROR,
      errors: message
    })
  },
};

module.exports = AuthActions;
