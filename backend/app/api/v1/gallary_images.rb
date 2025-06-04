module V1
    class GallaryImages < Grape::API
        format :json

        resource :gallary_images do
            desc "Get all gallary images"
            get do
                GallaryImage.all     
            end

            desc "Get single gallary image"
            params do
                requires :id, type: Integer
            end
            get ':id' do
                gallary_image = GallaryImage.find_by(id: params[:id])

                if gallary_image
                    { message: "Gallary image found successfully", gallary_image: gallary_image }
                else
                    error!({ message: "Gallary image not found" }, 404)
                end
            end

            desc "Create a gallary images"
            params do
                requires :img_src, type: String
            end
            post do
                gallary_image = GallaryImage.new({img_src: params[:img_src]})

                if gallary_image.save
                    { message: "Gallary image created successfully", gallary_image: gallary_image }
                else
                    error!({ message: "Failed to create a gallary image" }, 422)
                end
            end

            desc "Update a gallary image"
            params do
                requires :img_src, type: String
            end

            put ':id' do
                gallary_image = GallaryImage.find_by(id: params[:id])

                if gallary_image
                    if gallary_image.update(declared(params, include_missing: false).except(:id))
                        { message: "Gallary image updated successfully", gallary_image: gallary_image }
                    else
                        error!({ message: "Failed to update the gallay image", errors: gallary_image.errors.full_messages }, 422)
                    end
                else
                    error!({ message: "Gallary image not found" }, 404)
                end
            end

            desc "Delete a gallary image"
            params do
                requires :id, type: Integer
            end

            delete ':id' do
                image = GallaryImage.find_by(id: params[:id])

                if image
                    if image.destroy
                        { message: "Image deleted successfully" }
                    else
                        error!({ message: "Failed to delete image", errors: image.errors.full_messages }, 422)
                    end
                else
                    error!({ message: "Failed to find image" }, 404)
                end
            end
        end
    end
end