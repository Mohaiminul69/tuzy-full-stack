module V1
  class Bookings < Grape::API
    format :json

    before do
      authenticate_user!  # Call the authenticate_user! method to ensure the user is authenticated
    end

    resource :bookings do
      desc "Get all bookings"
      get do
        Booking.all
      end

      desc "Create a booking"
      params do
        requires :phone_number, type: String
        requires :address, type: String
        requires :credit_card_number, type: String
        requires :booking_date, type: String
        optional :destination_id, type: Integer
        optional :package_id, type: Integer
      end

      post do
        authenticate_user!

        if params[:destination_id].present? && params[:package_id].present?
          error!({ mesage: "Booking must belong to either a destination or a package, not both." }, 422)
        elsif params[:destination_id].blank? && params[:package_id].blank?
          error!({ message: "Booking must belong to either a destination or a package." }, 422)
        end

        booking = Booking.new({
          user_id: @current_user.id,
          phone_number: params[:phone_number],
          address: params[:address],
          credit_card_number: params[:credit_card_number],
          booking_date: params[:booking_date],
          destination_id: params[:destination_id],
          package_id: params[:package_id]
        })

        if booking.save
          { message: "Booking successful!", booking: booking }
        else
          error!({ message: "Booking failed", errors: booking.errors.full_messages }, 422)
        end
      end

      desc "Check if the user booked any specific destination or package"
      params do
        optional :destination_id, type: Integer
        optional :package_id, type: Integer
        exactly_one_of :destination_id, :package_id
      end

      get :check_booking do
        authenticate_user!

        has_booking = Booking.exists?(
          user_id: @current_user.id,
          destination_id: params[:destination_id],
          package_id: params[:package_id]
        )

        { has_booking: has_booking }
      end

      desc "Get current user bookings"
      get :my_bookings do
        authenticate_user!

        my_bookings = Booking.where(user_id: @current_user.id)

        if my_bookings
          { message: "Booking retrived successful", bookings: my_bookings }
        else
          error!({ message: "Failed to get user bookings", errors: my_bookings.errors.full_messages }, 422)
        end
      end
    end
  end
end