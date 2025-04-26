module V1
  class Users < Grape::API
    format :json

    resource :users do
      desc "Register a User"

      params do
        requires :first_name, type: String
        requires :last_name, type: String
        requires :email, type: String
        requires :img_src, type: String
        requires :date_of_birth, type: Date
        requires :password, type: String
        requires :password_confirmation, type: String
      end

      post :register do
        user = User.new({
          first_name: params[:first_name],
          last_name: params[:last_name],
          email: params[:email],
          img_src: params[:img_src],
          date_of_birth: params[:date_of_birth],
          password: params[:password],
          password_confirmation: params[:password_confirmation],
        })

        if user.save
          token = JwtService.encode(user_id: user.id)

          { 
            message: "User created successfully", 
            user:
              {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                date_of_birth: user.date_of_birth,
                img_src: user.img_src,
              },
            token: token
          }
        else
          error!({ message: "Failed to register the user", error: user.errors.full_messages }, 422)
        end
      end
    end
  end
end