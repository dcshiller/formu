class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def currentUser
    User.findBySessionToken(session[:session_token])
  end

  def login(user)
    session[:session_token] = User.set_session_token
  end

  def logout()
    currentUser.set_session_token
    session[:session_token] = undefined
    !session[:session_token]
  end

end
