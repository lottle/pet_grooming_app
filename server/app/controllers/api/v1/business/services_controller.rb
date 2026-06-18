class Api::V1::Business::ServicesController < ApplicationController
  before_action :require_business
  before_action :set_service, only: [:show, :update, :destroy]

  def index
    render json: Service.all.order_by(name: :asc)
  end

  def show
    render json: @service
  end

  def create
    service = Service.new(service_params)
    if service.save
      render json: service, status: :created
    else
      render json: { errors: service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: { errors: @service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @service.update(active: false)
    head :no_content
  end

  private

  def set_service
    @service = Service.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Not found" }, status: :not_found
  end

  def service_params
    params.permit(:name, :description, :duration, :price, :active)
  end

  def require_business
    require_role("business")
  end
end
