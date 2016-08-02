class Api::SessionsController < ApplicationController

  def create
    @user = User.findByUsername(params[:user][:username])
    if @user.isPassword?(params[:user][:password])
      render json: @user
    else
      render json: @user.errors
    end
  end

  def destroy
    logout
  end
end
