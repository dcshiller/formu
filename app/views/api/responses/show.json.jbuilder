
json.response_number = @response.id

json.array! @response.field_responses do |field_response|
  json.field_label field_response.field.field_label
  json.response_value field_response.response_value
end
