class ServiceSnapshot
  include Mongoid::Document

  embedded_in :booking

  field :name,     type: String
  field :duration, type: Integer
  field :price,    type: BigDecimal
end
