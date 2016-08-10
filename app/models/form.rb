# == Schema Information
#
# Table name: forms
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  instructions :text
#  designer_id  :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Form < ActiveRecord::Base
  belongs_to :designer, class_name: :User, foreign_key: :designer_id
  has_many :fields, class_name: :FormField, dependent: :destroy
  has_many :choices, through: :fields
  has_many :responses, class_name: "FormResponse", inverse_of: :form

  accepts_nested_attributes_for :fields, :allow_destroy => true

  validates :designer, :title, presence: true

end
