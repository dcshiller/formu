module.exports = {

  getResponse (responseId, successCallBack, failureCallBack) {
    $.ajax({
        url: "api/responses/" + responseId,
        method: "GET",
        dataType: "json",
        success(successMessage){successCallBack(successMessage)},
        error(errorMessage){failureCallBack(errorMessage)}
      });
  },

  submitResponse (responseData, successCallBack, failureCallBack) {
    $.ajax({
      url: "api/responses/",
      method: "POST",
      dataType: "json",
      data: responseData,
      success(successMessage){successCallBack(successMessage)},
      error(errorMessage){failureCallBack(errorMessage)}
    });
  }

};
