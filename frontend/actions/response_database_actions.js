const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ApiResponseUtils = require('../utils/api_response_utils.js')

module.exports = {

  confirmResponse () {},

  errorMessage () {},

  submitResponse (responseData) {
      ApiResponseUtils.submitResponse(responseData, this.confirmResponse, this.errorMessage)
  }

};
