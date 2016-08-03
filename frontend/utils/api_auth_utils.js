
module.exports = {
  login(user, successCallBack, failureCallBack){
    $.ajax({
      url: "api/sessions",
      method: "POST",
      data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(userData)}
    });
  },
  logout(user,successCallBack, failureCallBack){
    $.ajax({
      url: "api/sessions",
      method: "DELETE",
      data: {user: user},
      success(userData){successCallBack(userData)},
      error(errorMessage){failureCallBack(userData)}
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
