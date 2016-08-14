class Api::ChoicesController < ApplicationController

  def destroy
    @choice = FormFieldChoice.find(params[:id])
    if @choice
      @choice.destroy
      render json: {choice: "Deleted", id: params[:id]}, status: 200
    else
      render json: {choice: "Delete Failed", id: params[:id]}, status: 404
    end
  end

end
