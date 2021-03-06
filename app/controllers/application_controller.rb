class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def currentUser
    User.find_by_session_token(session[:session_token])
  end

  def login (user)
    session[:session_token] = user.set_session_token!
  end

  def logout ()
    return true unless currentUser
    currentUser.set_session_token
    session[:session_token] = nil;
    !session[:session_token]
  end

end
