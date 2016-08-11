json.id @response.id

json.created_at @response.created_at.to_formatted_s(:long)
json.form_title @response.form.title
#
# json.responses do
#   json.array! @response.field_responses do |field_response|
#     json.field_label field_response.field.label
#     json.response_value field_response.response_value
#   end
# end

sorted_fields = @response.form.fields.sort {|field1, field2| field1.position <=> field2.position}

json.responses do
  json.array! sorted_fields do |field|
    if field.field_type == "section_title"
      json.section_title field.label
    elsif field.field_type == "rule"
      json.rule "true"
    else
      json.field_label field.label
      responses_to_this_field = @response.field_responses.select {|resp| resp.form_field_id == field.id }
      json.response_value responses_to_this_field.collect {|resp| resp.response_value}
    end
  end
end
