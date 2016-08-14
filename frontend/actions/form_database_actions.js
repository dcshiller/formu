const AppDispatcher = require('../dispatcher/dispatcher.js');
const CONSTS = require('../constants/constants.js');
const ApiFormUtils = require('../utils/api_form_utils.js')


module.exports = {

  addIdAndNotifyErrorStore (message) {
    AppDispatcher.dispatch({
      actionType: CONSTS.ADD_FORM_ID,
      id: message.id
    });
    this.errorMessage(JSON.stringify(message));
  },

  clearForm () {
    AppDispatcher.dispatch({
      actionType: CONSTS.CLEAR_FORM
    })
  },

  deleteChoice (id) {
    if (id.slice) // note, this tests for a string, since instanceof doesn't work
      this.deleteChoiceSuccess(id);
    else {
      ApiFormUtils.deleteChoice(id, this.deleteChoiceSuccess.bind(null, id), this.errorMessage);
    }
  },

  deleteField (id) {
    if (id.slice)
      this.deleteFieldSuccess(id);
    else {
      ApiFormUtils.deleteField(id, this.deleteFieldSuccess.bind(null, id), this.errorMessage);
    }
  },

  deleteChoiceSuccess (choiceId) {
    debugger
      AppDispatcher.dispatch({
        actionType: CONSTS.CHOICE_DELETED,
        choiceId: choiceId
      });
  },

  deleteFieldSuccess (fieldId) {
    AppDispatcher.dispatch({
      actionType: CONSTS.FIELD_DELETED,
      fieldId: fieldId,
    });
  },

  deleteForm (id) {
    ApiFormUtils.deleteForm(id, this.formDeleted, this.errorMessage)
  },

  errorMessage (message) {
    AppDispatcher.dispatch({
      actionType: CONSTS.ERROR,
      errors: message
    })
  },

  formDeleted (id) {
    AppDispatcher.dispatch({
      actionType: CONSTS.FORM_DELETED,
      id: id
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
    this.errorMessage({form: 'Saving...'});
    ApiFormUtils.saveForm(form, this.passFormToDispatcher, this.errorMessage)
  },

  updateForm (form) {
    this.errorMessage({form: 'Updating...'});
    ApiFormUtils.updateForm(form, this.passFormToDispatcher, this.errorMessage)
  }
}
