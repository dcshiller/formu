# == Schema Information
#
# Table name: form_responses
#
#  id         :integer          not null, primary key
#  form_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FormResponse < ActiveRecord::Base

  has_many :field_responses, class_name: "FormFieldResponse", foreign_key: :response_id, dependent: :destroy, inverse_of: :response
  has_many :fields, class_name: "FormField", through: :field_responses
  belongs_to :form
  accepts_nested_attributes_for :field_responses, :allow_destroy => true

  validates :form, presence: true

end
