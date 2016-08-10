# == Schema Information
#
# Table name: form_fields
#
#  id           :integer          not null, primary key
#  form_id      :integer          not null
#  label        :string
#  instructions :text
#  position     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  field_type   :string
#

class FormField < ActiveRecord::Base
  belongs_to :form, foreign_key: :form_id
  has_many :choices, class_name: :FormFieldChoice, dependent: :destroy, inverse_of: :form_field
  has_many :responses, class_name: "FormFieldResponse", inverse_of: :field
  accepts_nested_attributes_for :choices, :allow_destroy => true

  # validates :form, presence: true

end
