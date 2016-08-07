json.form do

  json.formProperties do
    json.title @form.title
    json.instructions @form.instructions
    json.formId @form.id
  end

  json.fields do
    json.array @form.fields do |field|
      json.type field.field_type
      json.label field.label
      json.fieldId field.id
      json.instructions field.instructions
      json.choices do
          json.array field.choices do |choice|
            json.choice_text choice.choice_text
            json.choice_number choice.choice_position
          end
      end
    end
  end

end
