json.properties do
  json.Title @form.title
  json.Description @form.instructions
  json.id @form.id
end

json.fields do
  json.array! @form.fields do |field|
    json.type field.field_type
    json.label field.label
    json.fieldId field.id
    json.instructions field.instructions
    json.choices field.choices.collect {|choice| choice.choice_text}
  end
end
