class Api::V1::BookingsController < ApplicationController
  before_action :require_client
  before_action :set_booking, only: [:show, :destroy]

  def index
    bookings = current_user.bookings
      .order_by(starts_at: :asc)
      .map { |b| booking_json(b) }
    render json: bookings
  end

  def show
    render json: booking_json(@booking)
  end

  def create
    service = Service.active.find(params[:service_id])
    dog     = current_user.dogs.find(params[:dog_id])
    starts  = Time.parse(params[:starts_at])
    ends    = starts + service.duration.minutes

    booking = current_user.bookings.build(
      dog: dog,
      service: service,
      starts_at: starts,
      ends_at: ends,
      notes: params[:notes]
    )
    booking.build_service_snapshot(
      name: service.name,
      duration: service.duration,
      price: service.price
    )

    if booking.save
      render json: booking_json(booking), status: :created
    else
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
    end
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Not found" }, status: :not_found
  rescue ArgumentError
    render json: { error: "Invalid date format" }, status: :unprocessable_entity
  end

  def destroy
    @booking.update(status: "cancelled")
    render json: booking_json(@booking)
  end

  private

  def set_booking
    @booking = current_user.bookings.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Not found" }, status: :not_found
  end

  def booking_json(b)
    {
      id: b.id.to_s,
      starts_at: b.starts_at,
      ends_at: b.ends_at,
      status: b.status,
      notes: b.notes,
      dog: { id: b.dog_id.to_s, name: b.dog&.name },
      service_snapshot: b.service_snapshot&.then { |s| { name: s.name, duration: s.duration, price: s.price.to_f } }
    }
  end

  def require_client
    require_role("client")
  end
end
