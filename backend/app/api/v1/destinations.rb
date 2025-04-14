module V1
    class Destinations < Grape::API
      format :json
  
      resource :destinations do
        desc "Get all destinations"
        get do
          Destination.all
        end

        desc "Get a single destination"
        params do
          requires :id, type: Integer
        end
        get ':id' do
          destination = Destination.find_by(id: params[:id])

          if destination
            { message: "Destination found successfully", destination: destination }
          else
            error!({ message: "Destination not found" }, 404)
          end
        end
  
        desc "Create a new destination"
        params do
          requires :name, type: String
          requires :description, type: String
          requires :short_description, type: String
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

        desc "Update a destination"
        params do
          requires :id, type: Integer
          optional :name, type: String
          optional :description, type: String
          optional :short_description, type: String
          optional :price, type: String
          optional :img_src, type: String
        end
        put ':id' do
          destination = Destination.find_by(id: params[:id])

          if destination
            if destination.update(declared(params, include_missing: false).except(:id))
              { message: "Destination updated successfully", destination: destination }
            else
              error!({ message: "Failed to update the destination", errors: destination.errors.full_messages },  422)
            end
          else
            error!({ message: "Destination not found" }, 404)
          end
        end

        desc "Delete a destination"
        params do
          requires :id, type: Integer
        end
        delete ':id' do
          destination = Destination.find_by(id: params[:id])

          if destination
            if destination.destroy
              { message: "Destination deleted successfully" }
            else
              error!({ message: "Failed to delete destination" }, 422)
            end
          else
            error!({ message: "Destination not found" }, 404)
          end
        end
      end
    end
end
  