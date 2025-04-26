# app/api/v1/auth_helpers.rb
module V1
  module AuthHelpers
    def authenticate_user!
      token = headers['Authorization']&.split(' ')&.last
      decoded_token = JwtService.decode(token)

      if decoded_token && decoded_token[:exp] > Time.now.to_i
        user_id = decoded_token[:user_id]
        @current_user = User.find_by(id: user_id)

        error!('User not found', 404) if @current_user.nil?
      else
        error!('Token has expired', 401)
      end
    rescue JWT::DecodeError
      error!('Invalid token', 401)
    end
  end
end
