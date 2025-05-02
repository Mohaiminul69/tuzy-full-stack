module V1
  class Base < Grape::API
    prefix :api
    format :json

    helpers V1::AuthHelpers
    
    mount V1::Destinations
    mount V1::GallaryImages
    mount V1::Packages
    mount V1::Users
    mount V1::Bookings
    mount V1::Reviews
  end
end
