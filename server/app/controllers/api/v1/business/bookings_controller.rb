class Api::V1::Business::BookingsController < ApplicationController
  before_action :require_business
  before_action :set_booking, only: [:show, :update, :destroy]

  def index
    bookings = if params[:start].present? && params[:end].present?
      Booking.in_range(Time.parse(params[:start]), Time.parse(params[:end]))
    else
      Booking.all
    end

    render json: bookings.order_by(starts_at: :asc).map { |b| booking_json(b) }
  rescue ArgumentError
    render json: { error: "Invalid date range" }, status: :unprocessable_entity
  end

  def show
    render json: booking_json(@booking)
  end

  def update
    starts = Time.parse(params[:starts_at])
    service = @booking.service
    ends    = starts + service.duration.minutes

    if @booking.update(starts_at: starts, ends_at: ends)
      render json: booking_json(@booking)
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ArgumentError
    render json: { error: "Invalid date format" }, status: :unprocessable_entity
  end

  def destroy
    @booking.update(status: "cancelled")
    render json: booking_json(@booking)
  end

  private

  def set_booking
    @booking = Booking.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "Not found" }, status: :not_found
  end

  def booking_json(b)
    client = b.client
    {
      id: b.id.to_s,
      starts_at: b.starts_at,
      ends_at: b.ends_at,
      status: b.status,
      notes: b.notes,
      client: { id: b.client_id.to_s, name: client&.name, email: client&.email },
      dog: { id: b.dog_id.to_s, name: b.dog&.name, breed: b.dog&.breed },
      service_snapshot: b.service_snapshot&.then { |s| { name: s.name, duration: s.duration, price: s.price.to_f } }
    }
  end

  def require_business
    require_role("business")
  end
end
