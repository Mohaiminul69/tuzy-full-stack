module V1
    class GallaryImages < Grape::API
        format :json

        resource :gallary_images do
            desc "Get all gallary images"
            get do
                GallaryImage.all     
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
        end
    end
end