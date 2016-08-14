module.exports = {

  deleteChoice (choiceId, successCallBack, failureCallBack) {
  $.ajax({
      url: "api/choices/" + choiceId,
      method: "DELETE",
      dataType: "json",
      success(successMessage){successCallBack(successMessage)},
      error(errorMessage){failureCallBack(errorMessage)}
    });
  },

  deleteField (fieldId, successCallBack, failureCallBack) {
    $.ajax({
        url: "api/fields/" + fieldId,
        method: "DELETE",
        dataType: "json",
        success(successMessage){successCallBack(successMessage)},
        error(errorMessage){failureCallBack(errorMessage)}
      });
  },

  deleteForm(formId, successCallBack, failureCallBack) {
    $.ajax({
        url: "api/forms/" + formId,
        method: "DELETE",
        dataType: "json",
        success(successMessage){successCallBack(successMessage.id)},
        error(errorMessage){failureCallBack(errorMessage)}
      });
  },

  getForm (formId, successCallBack, failureCallBack) {
    $.ajax({
      url: "api/forms/" + formId,
      method: "GET",
      dataType: "json",
      success(formData){successCallBack(formData)},
      error(errorMessage){failureCallBack(errorMessage.responseText)}
    });
  },

  getForms (username, successCallBack, failureCallBack) {
    $.ajax({
      url: "api/forms",
      method: "GET",
      dataType: "json",
      data: { username: username },
      success(formData){successCallBack(formData)},
      error(errorMessage){failureCallBack(errorMessage)}
    });
  },

  saveForm (form, successCallBack, failureCallBack) {
    $.ajax({
        url: "api/forms",
        method: "POST",
        dataType: "json",
        data: { form: form },
        success(formData){successCallBack(formData)},
        error(errorMessage){failureCallBack(errorMessage)
    }
    });
  },

  updateForm(form, successCallBack, failureCallBack){
    $.ajax({
        url: "api/forms/" + form.properties.id,
        method: "PATCH",
        dataType: "json",
        data: { form: form },
        success(formData){successCallBack(formData)},
        error(errorMessage){failureCallBack(errorMessage)
    }
    });
  }
}
