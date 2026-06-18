class Api::V1::ServicesController < ApplicationController
  def index
    render json: Service.active.order_by(name: :asc)
  end

  def show
    service = Service.active.find(params[:id])
    render json: service
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Not found" }, status: :not_found
  end
end
