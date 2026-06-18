class Service
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name,        type: String
  field :description, type: String
  field :duration,    type: Integer
  field :price,       type: BigDecimal
  field :active,      type: Mongoid::Boolean, default: true

  validates :name,     presence: true
  validates :duration, presence: true, numericality: { greater_than: 0 }
  validates :price,    presence: true, numericality: { greater_than_or_equal_to: 0 }

  scope :active, -> { where(active: true) }

  index({ active: 1 })

  def as_json(options = {})
    super(options.merge(except: :_id)).merge("id" => id.to_s)
  end
end
