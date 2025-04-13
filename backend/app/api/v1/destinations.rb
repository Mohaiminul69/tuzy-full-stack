module V1
    class Destinations < Grape::API
      format :json
  
      resource :destinations do
        desc "Get all destinations"
        get do
          Destination.all
        end
  
        desc "Create a new destination"
        params do
          requires :name, type: String
          requires :description, type: String
          requires :price, type: String
          requires :img_src, type: String
        end
        post do
          destination = Destination.new({
            name: params[:name],
            description: params[:description],
            price: params[:price],
            img_src: params[:img_src]
          })
  
          if destination.save
            { message: "Destination created successfully", destination: destination }
          else
            error!({ message: "Failed to create destination", errors: destination.errors.full_messages }, 422)
          end
        end
      end
    end
end
  