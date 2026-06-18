class JwtService
  EXPIRY = 24.hours

  def self.encode(payload)
    payload[:exp] = EXPIRY.from_now.to_i
    JWT.encode(payload, secret, "HS256")
  end

  def self.decode(token)
    decoded = JWT.decode(token, secret, true, { algorithm: "HS256" })
    HashWithIndifferentAccess.new(decoded.first)
  rescue JWT::DecodeError => e
    raise e
  end

  def self.secret
    Rails.application.secret_key_base
  end
  private_class_method :secret
end
