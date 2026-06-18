class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    token = extract_token
    payload = JwtService.decode(token)
    @current_user = User.find(payload[:sub])
  rescue JWT::DecodeError, Mongoid::Errors::DocumentNotFound
    render json: { error: "Unauthorized" }, status: :unauthorized
  end

  def extract_token
    header = request.headers["Authorization"]
    header&.split(" ")&.last || raise(JWT::DecodeError, "No token")
  end

  def require_role(role)
    render json: { error: "Forbidden" }, status: :forbidden unless @current_user.role == role
  end

  def current_user
    @current_user
  end
end
