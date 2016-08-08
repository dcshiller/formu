
module.exports = {

  login (user, successCallBack, failureCallBack) {
    $.ajax({
      url: "api/session",
      method: "POST",
      dataType: "json",
      data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(errorMessage.responseText)}
    });
  },

  logout (successCallBack, failureCallBack) {
    $.ajax({
      url: "api/session",
      method: "DELETE",
      dataType: "json",
      // data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(errorMessage.responseText)}
    });
  },

  createUser (user,successCallBack, failureCallBack) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: user},
      dataType: "json",
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(errorMessage.responseText)}
    });
  }

};
