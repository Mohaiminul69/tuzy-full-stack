module V1
  class Reviews < Grape::API
    format :json

    resource :reviews do
      desc "Get specific destinations or packages reviews"

      params do
        optional :destination_id, type: Integer
        optional :package_id, type: Integer
      end

      get do
        if params[:destination_id]
          Review.where(destination_id: params[:destination_id])
        elsif params[:package_id]
          Review.where(package_id: params[:package_id])
        else
          Review.all
        end
      end
      
      desc "Create a review"
      params do
        requires :rating, type: Integer
        requires :comment, type: String
        optional :destination_id, type: Integer
        optional :package_id, type: Integer
        exactly_one_of :destination_id, :package_id
      end

      post do
        authenticate_user!

        review = Review.new({
          user_id: @current_user.id,
          rating: params[:rating],
          comment: params[:comment],
          destination_id: params[:destination_id],
          package_id: params[:package_id]
        })

        if review.save
          { message: "Review has been created successfully", review: review }
        else
          error!({ message: "Failed to create review", errors: review.errors.full_messages }, 422)
        end
      end
    end
  end
end