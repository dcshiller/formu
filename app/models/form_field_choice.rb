# == Schema Information
#
# Table name: form_field_choices
#
#  id              :integer          not null, primary key
#  form_field_id   :integer          not null
#  choice_text     :string           not null
#  choice_position :integer          not null
#

class FormFieldChoice < ActiveRecord::Base
  belongs_to :form_field, class_name: :FormField, foreign_key: :form_field_id
  has_one :form, through: :form_field

  validates :choice_text, :choice_position, :form_field, presence: true
end
