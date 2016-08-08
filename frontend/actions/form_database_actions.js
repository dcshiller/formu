const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ApiFormUtils = require('../utils/api_form_utils.js')


module.exports = {
  getForm (form_id) {
    ApiFormUtils.getForm(form_id, this.passFormToDispatcher, this.errorMessage)
  },

  passFormToDispatcher (form) {
    AppDispatcher.dispatch({
        actionType: CONSTS.SET_FORM,
        form: form
    });
  },

  saveForm (form) {
    ApiFormUtils.saveForm(form, this.errorMessage, this.errorMessage)
  },

  errorMessage (message) {
    AppDispatcher.dispatch({
      actionType: CONSTS.ERROR,
      errors: message
    })
  },
}
