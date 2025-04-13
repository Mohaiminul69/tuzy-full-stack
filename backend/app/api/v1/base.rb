# app/api/v1/base.rb
module V1
    class Base < Grape::API
      format :json
      prefix :api
    
      resource :ping do
        get do
          { message: "pong" }
        end
      end
    end
end
  