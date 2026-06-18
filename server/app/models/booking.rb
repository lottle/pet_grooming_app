class Booking
  include Mongoid::Document
  include Mongoid::Timestamps

  field :starts_at, type: Time
  field :ends_at,   type: Time
  field :status,    type: String, default: "confirmed"
  field :notes,     type: String

  belongs_to :client,  class_name: "User"
  belongs_to :dog,     class_name: "Dog"
  belongs_to :service, class_name: "Service"

  embeds_one :service_snapshot, class_name: "ServiceSnapshot"

  validates :starts_at, :ends_at, :status, presence: true
  validates :status, inclusion: { in: %w[confirmed cancelled] }
  validate  :no_overlap, on: :create

  scope :upcoming,   -> { where(status: "confirmed", :starts_at.gte => Time.now).order_by(starts_at: :asc) }
  scope :in_range,   ->(from, to) { where(:starts_at.gte => from, :starts_at.lte => to) }
  scope :confirmed,  -> { where(status: "confirmed") }

  index({ client_id: 1, status: 1 })
  index({ starts_at: 1, status: 1 })

  private

  def no_overlap
    conflicts = Booking.confirmed
      .where(:id.ne => id)
      .where(:starts_at.lt => ends_at, :ends_at.gt => starts_at)
    errors.add(:starts_at, "overlaps an existing booking") if conflicts.exists?
  end
end
