module V1
  class Packages < Grape::API
    format :json

    resource :packages do
      desc "Get all packages"
      get do
        Package.all
      end

      desc "Get single package"
      params do
        requires :id, type: Integer
      end
      get ':id' do
        package = Package.find_by(id: params[:id])

        if package
          { message: "Package found successfully", package: package }
        else
          error!({ message: "Package not found", errors: package.errors.full_messages }, 422)
        end
      end

      desc "Create a package"
      params do
        requires :name, type: String
        requires :price, type: String
        requires :description, type: String
        requires :img_src, type: String
      end

      post do
        package = Package.new({
          name: params[:name],
          price: params[:price],
          description: params[:description],
          img_src: params[:img_src]
        })

        if package.save
          { message: "Package has been created successfully", package: package }
        else
          error!({ message: "Failed to create package", error: package.errors.full_messages }, 422)
        end
      end

      desc "Delete a package"
      params do
        requires :id, type: Integer
      end

      delete ':id' do
        package = Package.find_by(id: params[:id])

        if package
          if package.destroy
            status 200
            { message: "Package deleted successfully" }
          else
            error!({ message: "Failed to delete package", errors: package.errors.full_messages }, 422)
          end
        else
          error!({ message: "Package not found" }, 404)
        end
      end
    end
  end
end