class User < ActiveRecord::Base

  attr_reader :password

  before_validation :set_session_token
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: {in: 6..16}

  def set_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def isPassword?(password)
    BCrypt::Password.new(password_digest).isPassword?(password)
  end

end
