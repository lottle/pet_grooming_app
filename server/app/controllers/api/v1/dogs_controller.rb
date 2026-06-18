class Api::V1::DogsController < ApplicationController
  before_action :require_client
  before_action :set_dog, only: [:show, :update, :destroy]

  def index
    render json: current_user.dogs.order_by(created_at: :asc)
  end

  def show
    render json: @dog
  end

  def create
    dog = current_user.dogs.build(dog_params)
    if dog.save
      render json: dog, status: :created
    else
      render json: { errors: dog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @dog.update(dog_params)
      render json: @dog
    else
      render json: { errors: @dog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @dog.destroy
    head :no_content
  end

  private

  def set_dog
    @dog = current_user.dogs.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Not found" }, status: :not_found
  end

  def dog_params
    params.permit(:name, :breed, :age, :notes)
  end

  def require_client
    require_role("client")
  end
end
