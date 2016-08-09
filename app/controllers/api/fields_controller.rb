class Api::FieldsController < ApplicationController

  def destroy
    @field = FormField.find(params[:id])
    @field.destroy if @field
    render json: {field: "Deleted", id: params[:id]}, status: 200
  end

end
