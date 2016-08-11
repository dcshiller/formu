module.exports = {
  sendInvitation (emailParams, successCallBack, failureCallBack) {
    $.ajax({
        url: "api/invitation/",
        method: "POST",
        dataType: "json",
        data: emailParams,
        success(successMessage){successCallBack(successMessage)},
        error(errorMessage){failureCallBack(errorMessage.responseText)}
      });
  }
};
