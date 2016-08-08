module.exports = {

  getForm(form_id, successCallBack, failureCallBack){
    $.ajax({
      url: "api/forms/" + form_id,
      method: "GET",
      dataType: "json",
      success(formData){successCallBack(formData)},
      error(errorMessage){failureCallBack(errorMessage)}
    });
  },

  saveForm(form, successCallBack, failureCallBack){
    $.ajax({
        url: "api/forms",
        method: "POST",
        dataType: "json",
        data: {form: form},
        success(successMessage){successCallBack(JSON.stringify(successMessage))},
        error(errorMessage){failureCallBack(errorMessage)
    }
    });
  },

  updateForm(form, successCallBack, failureCallBack){}
}
