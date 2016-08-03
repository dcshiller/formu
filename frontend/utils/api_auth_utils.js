
module.exports = {
  login(user, successCallBack, failureCallBack){
    $.ajax({
      url: "api/session",
      method: "POST",
      data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(errorMessage)}
    });
  },
  logout(user,successCallBack, failureCallBack){
    $.ajax({
      url: "api/session",
      method: "DELETE",
      data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(errorMessage)}
    });
  },
  createUser(user,successCallBack, failureCallBack){
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(errorMessage.responseText)}
    });
  }
};
