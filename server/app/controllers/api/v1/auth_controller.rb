class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_request, only: [:register, :login]

  def register
    user = User.new(register_params)
    if user.save
      token = JwtService.encode({ sub: user.id.to_s, role: user.role })
      render json: { user: user_json(user), token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.where(email: params[:email].to_s.downcase.strip).first
    if user&.authenticate(params[:password])
      token = JwtService.encode({ sub: user.id.to_s, role: user.role })
      render json: { user: user_json(user), token: token }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def logout
    render json: { message: "Logged out" }
  end

  def me
    render json: { user: user_json(current_user) }
  end

  private

  def register_params
    params.permit(:email, :password, :name).merge(role: "client", email: params[:email].to_s.downcase.strip)
  end

  def user_json(user)
    { id: user.id.to_s, email: user.email, name: user.name, role: user.role }
  end
end
