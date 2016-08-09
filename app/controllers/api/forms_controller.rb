class Api::FormsController < ApplicationController

  def create
    new_form = translate_form_data
    @form = Form.create(new_form)
    if @form.save
      # render json: {password: "incorrect"}, status: 401
      render json: {form: "Saved", id: @form.id}, status: 200
    else
      render json: {form: "Error"}, status: 422
    end
  end

  def update
    updated_form = translate_form_data
    @form = Form.find(updated_form[:id])
    debugger
    if @form.update(updated_form)
      # render json: {password: "incorrect"}, status: 401
      render json: {form: "Updated"}, status: 200
    else

      render json: {form: "Error"}, status: 422
    end
  end

  def destroy

  end

  def show
    @form = Form.find(params[:id])
    render :show
  end

  def index
    if currentUser.username == params[:username]
      @forms = currentUser.forms
      render :index
    else
      render json: {forms: "Not Current User"}, status: 400
    end
  end


  private

  def form_params
    params.require(:form).permit(:properties, :fields)
  end

  def translate_form_data
    translated_form = {}
    translated_form[:title] = params[:form][:properties][:Title] if params[:form][:properties]
    translated_form[:instructions] = params[:form][:properties][:Description] if params[:form][:properties]
    translated_form[:fields_attributes] = params[:form][:fields].values if params[:form][:fields]
    translated_form[:fields_attributes] && translated_form[:fields_attributes].collect!.with_index do |field, index|
      field[:position] = index
      field[:instructions] = field[:Instructions]
      field[:field_type] = field[:type]
      # field[:id] = field[:fieldId]
      field.delete :type
      field.delete :fieldId
      field.delete :Label
      field.delete :Instructions
      field[:choices_attributes] = field[:choices] if field[:choices]
      field[:choices] && field[:choices_attributes].collect!.with_index do |choice, choice_index|
        {choice_text: choice, choice_position: choice_index}
      end
      field.delete :choices
      field
    end
    translated_form[:fields_attributes].compact!

    translated_form[:id] = params[:form][:properties][:id]
    translated_form[:designer_id] = (currentUser && currentUser.id) || 1
    translated_form
  end

end
