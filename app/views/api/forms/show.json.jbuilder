json.properties do
  json.title @form.title
  json.instructions @form.instructions
  json.id @form.id
end

sorted_fields = @form.fields.sort {|field1, field2| field1.position <=> field2.position}

json.fields do
  json.array! sorted_fields do |field|
    json.type field.field_type
    json.label field.label
    json.id field.id
    json.instructions field.instructions || ""
    json.choices do
      json.array! field.choices.collect do |choice|
          json.choice_text choice.choice_text
          json.choice_position choice.choice_position
          json.id choice.id
        end
      end
  end
end
