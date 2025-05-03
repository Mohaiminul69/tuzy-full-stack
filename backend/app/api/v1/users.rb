module V1
  class Users < Grape::API
    format :json

    resource :users do
      desc "Fetch current user info"

      get :me do
        authenticate_user!

        {
          user: {
            id: @current_user.id,
            first_name: @current_user.first_name,
            last_name: @current_user.last_name,
            email: @current_user.email,
            img_src: @current_user.img_src,
            date_of_birth: @current_user.date_of_birth,
            admin: @current_user.admin,
          }
        }
      end

      desc "Get single user info"
      params do
        requires :id, type: Integer
      end

      get ':id' do
        user = User.find_by(id: params[:id])

        if user
          { message: "User found successfully", user: user }
        else
          error!({ message: "User not found" }, 404)
        end
      end
      
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

      desc "Login a user"

      params do
        requires :email, type: String
        requires :password, type: String
      end

      post :login do
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          token = JwtService.encode(user_id: user.id)
          { 
            user:
              {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                date_of_birth: user.date_of_birth,
                img_src: user.img_src,
                admin: user.admin,
              },
            token: token
          }
        else
          error!({ message: "Invalid email or password" }, 401)
        end
      end
    end
  end
end