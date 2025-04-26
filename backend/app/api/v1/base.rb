module V1
  class Base < Grape::API
    prefix :api
    format :json

    mount V1::Destinations
    mount V1::GallaryImages
    mount V1::Packages
  end
end
