# spec/support/auth_helper.rb
module AuthHelper
  def auth_headers(user)
    payload = {
      user_id: user.id,
      exp: 2.hours.from_now.to_i
    }
    token = JwtService.encode(payload)
  
    {
      'Authorization' => "Bearer #{token}",
      'Content-Type' => 'application/json'
    }
  end
end
