const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ApiFormUtils = require('../utils/api_form_utils.js')


module.exports = {

  addIdAndNotifyErrorStore (message) {
    AppDispatcher.dispatch({
      actionType: CONSTS.ADD_FORM_ID,
      id: message.id
    });
    this.errorMessage(message);
  },

  clearForm () {
    AppDispatcher.dispatch({
      actionType: CONSTS.CLEAR_FORM
    })
  },

  deleteField (id) {
    if (id.slice)
      this.deleteFieldSuccess(id);
    else {
      ApiFormUtils.deleteField(id, this.deleteFieldSuccess.bind(null, id), this.errorMessage);
    }
  },

  deleteFieldSuccess (fieldId) {
    AppDispatcher.dispatch({
      actionType: CONSTS.DELETE_FIELD,
      fieldId: fieldId,
    });
  },

  errorMessage (message) {
    AppDispatcher.dispatch({
      actionType: CONSTS.ERROR,
      errors: message
    })
  },

  getForm (formId) {
    ApiFormUtils.getForm(formId, this.passFormToDispatcher, this.errorMessage)
  },

  getForms (username) {
    ApiFormUtils.getForms(username, this.passFormsToDispatcher, this.errorMessage)
  },

  passFormToDispatcher (form) {
    AppDispatcher.dispatch({
        actionType: CONSTS.SET_FORM,
        form: form
    });
  },

  passFormsToDispatcher (form) {
    AppDispatcher.dispatch({
        actionType: CONSTS.SET_FORMS,
        forms: form
    });
  },

  saveForm (form) {
    ApiFormUtils.saveForm(form, this.addIdAndNotifyErrorStore.bind(this), this.errorMessage)
  },

  updateForm (form) {
    ApiFormUtils.updateForm(form, this.errorMessage, this.errorMessage)
  }
}
