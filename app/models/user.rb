# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string
#

class User < ActiveRecord::Base
  has_many :forms, foreign_key: :designer_id, dependent: :destroy
  has_many :responses, through: :forms

  attr_reader :password

  before_validation :ensure_session_token
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {in: 6..16, allow_nil: true}

  def set_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end

  def set_session_token!
    self.set_session_token
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token || self.set_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

end
