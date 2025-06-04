require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let(:valid_attributes) do
    {
      first_name: 'Dew',
      last_name: 'Haven',
      email: 'dew@gmail.com',
      password: 'asd123',
      password_confirmation: 'asd123',
      img_src: 'abc.jpg',
      date_of_birth: '1995-02-02'
    }
  end

  describe 'POST /api/users/register' do
    it 'creates a new user and returns token' do
      post '/api/users/register', params: valid_attributes

      expect(response.status).to eq(201)
      expect(response.parsed_body['user']['email']).to eq(valid_attributes[:email])
      expect(response.parsed_body['token']).not_to be_nil
    end

    it 'returns error if validation fails' do
      post '/api/users/register', params: valid_attributes.except(:email)

      expect(response.status).to eq(400)
      expect(response.parsed_body['error']).to include('email is missing')
    end
  end

  describe 'POST /api/users/login' do
    let!(:user) { create(:user, email: valid_attributes[:email], password: 'asd123') }

    it 'logs in a user with valid credentials' do
      post '/api/users/login', params: { email: user.email, password: 'asd123' }

      expect(response.status).to eq(200)
      expect(response.parsed_body['token']).not_to be_nil
      expect(response.parsed_body['user']['email']).to eq(user.email)
    end

    it 'returns error with invalid credentials' do
      post '/api/users/login', params: { email: user.email, password: 'qwe123' }

      expect(response).to have_http_status(:unauthorized)
      expect(response.parsed_body['message']).to eq('Invalid email or password')
    end
  end

  describe 'GET /api/users/me' do
    let!(:user) { create(:user) }
    let(:headers) { auth_headers(user) }

    it 'returns current user details' do
      get '/api/users/me', headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body['user']['id']).to eq(user.id)
      expect(response.parsed_body['user']['email']).to eq(user.email)
    end

    it 'returns unauthorized without token' do
      get '/api/users/me'

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'PUT /api/users/me' do
    let!(:user) { create(:user) }
    let(:headers) { auth_headers(user) }

    it 'updates user profile' do
      put '/api/users/me', params: { first_name: 'Updated' }, headers: headers, as: :json

      expect(response.status).to eq(200)
      expect(response.parsed_body['user']['first_name']).to eq('Updated')
    end

    it 'returns error on invalid update' do
      put '/api/users/me', params: { email: '' }, headers: headers, as: :json

      expect(response.status).to eq(422)
      expect(response.parsed_body['message']).to eq('Failed to update profile')
    end
  end
end
