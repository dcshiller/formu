class FormFieldChoice < ActiveRecord::Base
  belongs_to :form_field, class_name: :FormField, foreign_key: :form_field_id
  has_one :form, through: :form_field

  validates :choice_text, :choice_position, :form_field, presence: true
end
