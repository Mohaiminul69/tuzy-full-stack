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
    end
  end
end