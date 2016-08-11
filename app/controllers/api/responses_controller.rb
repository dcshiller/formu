class Api::ResponsesController < ApplicationController

  # {"response"=>{"0"=>{"name"=>"256", "value"=>"sdfsdfds"}, "1"=>{"name"=>"257", "value"=>"480"}, "2"=>{"name"=>"260", "value"=>"490"}, "3"=>{"name"=>"260", "value"=>"492"}, "4"=>{"name"=>"260", "value"=>"494"}, "5"=>{"name"=>"269", "value"=>"521"}}, "controller"=>"api/responses", "action"=>"create"}


  def create
    @form = Form.includes(:fields, :choices).find(params[:id])
    responses = params[:responses]
    response_hashes = responses.values.collect do |value|
      form_field_id = value["name"]
      field = @form.fields.find_by_id(form_field_id)
      if field.field_type == "checkbox" || field.field_type == "radio"
        choice = @form.choices.find_by_id(value["value"])
        response_value = choice.choice_text
      else
        response_value = value["value"]
      end
      {form_field_id: form_field_id, response_value: response_value}
    end
  end

  new_response_props = {form_id: @form["id"], field_responses_attributes: response_hashes}
  @new_response = FormResponse.new(new_response_props)
  if @new_response.save
    render :show
  else
    render json: new_response.errors.messages, status: 400
  end
end
