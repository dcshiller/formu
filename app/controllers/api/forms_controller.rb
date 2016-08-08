class Api::FormsController < ApplicationController

  def create
    newForm = {}
    newForm[:title] = params[:form][:properties][:Title] if params[:form][:properties]
    newForm[:instructions] = params[:form][:properties][:Description] if params[:form][:properties]
    newForm[:fields_attributes] = params[:form][:fields].values if params[:form][:fields]
    newForm[:fields_attributes] && newForm[:fields_attributes].collect!.with_index do |field, index|
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
    newForm[:fields_attributes].compact!

    newForm[:designer_id] = currentUser && currentUser.id || 1
    @form = Form.create(newForm)
    if @form.save
      render json: {form: "saved"}
    else
      render json: {form: "error"}, status: 422
    end
  end

  def update

  end


  def destroy

  end

  def show
    @form = Form.find(params[:id])
    render :show
  end

  def form_params
    params.require(:form).permit(:properties, :fields)
  end

end
