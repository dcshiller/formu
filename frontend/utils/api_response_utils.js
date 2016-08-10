module.exports = {

  submitResponse (responseData) {
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
