class Form < ActiveRecord::Base
  belongs_to :designer, class_name: :User, foreign_key: :designer_id
  has_many :fields, class_name: :FormField, dependent: :destroy
  accepts_nested_attributes_for :fields, :allow_destroy => true

  validates :designer, :title, presence: true

end
