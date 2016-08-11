const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ApiResponseUtils = require('../utils/api_response_utils.js')

module.exports = {

  errorMessage (errorMessage) {
    debugger
  },

  getResponse (responseId) {
    ApiResponseUtils.getResponse(responseId, this.passResponseToDispatcher, this.errorMessage)
  },

  passResponseToDispatcher (response) {
    AppDispatcher.dispatch({
      actionType: CONSTS.SET_RESPONSE,
      response: response
    })
  },

  submitResponse (responseData) {
      ApiResponseUtils.submitResponse(responseData, this.confirmResponse, this.errorMessage)
  }

};
