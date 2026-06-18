class Dog
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name,  type: String
  field :breed, type: String
  field :age,   type: Integer
  field :notes, type: String

  belongs_to :owner, class_name: "User"

  validates :name, presence: true

  index({ owner_id: 1 })

  def as_json(options = {})
    super(options.merge(except: :_id)).merge("id" => id.to_s)
  end
end
