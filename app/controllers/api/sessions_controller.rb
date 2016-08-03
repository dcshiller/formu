class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_username(params[:user][:username])
    if @user and @user.is_password?(params[:user][:password])
      render "api/users/show"
    elsif @user
      render json: {password: "incorrect"}, status: 401
    else
      render json: {username: "not found"}, status: 401
    end
  end

  def destroy
    if logout
      render json: {session_logout: "success"}
    else
      render json: {session_logout: "failure"}, status: 500
    end
  end
end
