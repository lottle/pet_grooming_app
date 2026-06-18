class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  has_secure_password

  field :email,           type: String
  field :password_digest, type: String
  field :role,            type: String
  field :name,            type: String

  has_many :dogs,     class_name: "Dog",     inverse_of: :owner,  dependent: :destroy
  has_many :bookings, class_name: "Booking", inverse_of: :client, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role,  presence: true, inclusion: { in: %w[client business] }
  validates :name,  presence: true

  index({ email: 1 }, { unique: true })
  index({ role: 1 })
end
