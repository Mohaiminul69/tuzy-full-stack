module V1
  class Base < Grape::API
    prefix :api
    format :json

    mount V1::Destinations
  end
end
