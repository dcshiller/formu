const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ApiEmailUtils = require('../utils/api_email_utils.js')

module.exports = {

  errorMessage(message){
    AppDispatcher.dispatch({
      actionType: CONSTS.ERROR,
      errors: message
    })
  },

  sendInvitation (emailParams) {
    ApiEmailUtils.sendInvitation(emailParams, this.errorMessage, this.errorMessage);
  }

}
