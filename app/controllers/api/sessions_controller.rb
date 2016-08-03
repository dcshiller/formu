class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_username(params[:user][:username])
    if @user and @user.is_password?(params[:user][:password])
      render "api/users/show"
    elsif @user
      render json: {password: "incorrect"}
    else
      render json: {user: "not found"} 
    end
  end

  def destroy
    logout
  end
end
