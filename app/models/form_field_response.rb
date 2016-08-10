# == Schema Information
#
# Table name: form_field_responses
#
#  id             :integer          not null, primary key
#  form_field_id  :integer          not null
#  response_id    :integer          not null
#  response_value :text
#

class FormFieldResponse < ActiveRecord::Base

belongs_to :response, class_name: "FormResponse", foreign_key: :response_id
belongs_to :field, class_name: "FormField", foreign_key: :form_field_id

validates :field, :response, presence: true;


end
