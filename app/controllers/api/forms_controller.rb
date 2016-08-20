class Api::FormsController < ApplicationController

  def create
    new_form = translate_form_data
    @form = Form.create(new_form)
    if @form.save
      # render json: {password: "incorrect"}, status: 401
      render :show
    else
      render json: {form: "Error"}, status: 422
    end
  end

  def update
    updated_form = translate_form_data
    @form = Form.find(updated_form[:id])
    if @form.update(updated_form)
      @form.choices do |choice|
        if updated_form[:fields_attributes].none? do |field|
            field[:choices].include? choice.choice_text
        end
          FormFieldChoice.delete(choice.id)
        end
      end
      render :show
    else
      render json: {form: "Error"}, status: 422
    end
  end

  def destroy
    @form = Form.find(params[:id])
    if @form.destroy
      render json: {form: "Delete Suceeded", id: params[:id]}, status: 200
    else
      render json: {form: "Delete Failed"}, status: 400
    end
  end

  def show
    begin
      @form = Form.find(params[:id])
      render :show
    rescue
      render json: {form: "Not Found"}, status: 404
    end
  end

  def index
    @currentUser = User.includes(forms: :responses).find_by_session_token(session[:session_token])
    if currentUser
      render :index
    else
      render json: {forms: "Not Current User"}, status: 400
    end
  end


  private

  def form_params
    params.require(:form).permit(:properties, :fields)
  end


  def removeTemps(array)
    array.collect do |element|
      if element["id"] && element["id"].is_a?(String) && element["id"].slice(0,4)=="TEMP"
        element["id"] = nil
      end
        element
    end
  end

  def translate_form_data
    translated_form = {}
    translated_form[:title] = params[:form][:properties][:title] if params[:form][:properties]
    translated_form[:instructions] = params[:form][:properties][:instructions] if params[:form][:properties]
    translated_form[:fields_attributes] = params[:form][:fields].values if params[:form][:fields]
    translated_form[:fields_attributes] && translated_form[:fields_attributes].collect!.with_index do |field, index|
      field[:position] = index
      field[:label] = field[:label]
      field[:instructions] = field[:instructions]
      field[:field_type] = field[:type]
      field.delete :className
      field.delete "id" if (field["id"] && field["id"].is_a?(String) && field["id"].slice(0,4) == "TEMP")
      field.delete :type
      field.delete :fieldId
      choices = field[:choices] ? removeTemps(field[:choices].values) : []
      field[:choices_attributes] = choices
      field[:choices_attributes]
      # if field[:choices] &&
      #   field[:choices_attributes].collect!.with_index do |choice, choice_index|
      #     {choice_text: choice, choice_position: choice_index}
      #   end
      #   field[:choices_attributes] = field[:choices_attributes]
      # end

      field.delete :choices
      field
    end

    translated_form[:fields_attributes].compact! if translated_form[:fields_attributes]

    translated_form[:id] = params[:form][:properties][:id]
    translated_form[:designer_id] = (currentUser && currentUser.id) || 1
    translated_form
  end

end
