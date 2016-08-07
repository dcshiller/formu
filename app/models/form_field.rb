class FormField < ActiveRecord::Base
  belongs_to :form, foreign_key: :form_id
  has_many :choices, class_name: :FormFieldChoice, dependent: :destroy, inverse_of: :form_field
  accepts_nested_attributes_for :choices, :allow_destroy => true

  # validates :form_id, presence: true

end
