# spec/requests/api/v1/destinations_spec.rb
require 'rails_helper'

RSpec.describe 'Destinations API', type: :request do
  let!(:destination) { Destination.create(name: 'Paris', description: 'City of Light', short_description: 'Romantic city', price: '1000', img_src: 'paris.jpg') }

  describe 'GET /destinations' do
    it 'returns all destinations' do
      get '/api/destinations'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).first['name']).to eq('Paris')
    end
  end

  describe 'GET /destinations/:id' do
    it 'returns the destination' do
      get "/api/destinations/#{destination.id}"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['destination']['name']).to eq('Paris')
    end

    it 'returns 404 if not found' do
      get "/api/destinations/9999"
      expect(response).to have_http_status(404)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Destination not found')
    end
  end

  describe 'POST /api/destinations' do
    let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }
  
    let(:valid_params) do
      {
        name: 'Tokyo',
        description: 'Beautiful city',
        short_description: 'Culture and tech',
        price: '1500',
        img_src: 'tokyo.jpg'
      }
    end
  
    it 'creates a destination' do
      post '/api/destinations', params: valid_params.to_json, headers: headers
      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Destination created successfully')
      expect(json['destination']['name']).to eq('Tokyo')
    end
  
    it 'returns 422 for invalid input' do
      post '/api/destinations', params: valid_params.except(:name).to_json, headers: headers
      expect(response).to have_http_status(400)
      json = JSON.parse(response.body)
      expect(json['error']).to eq('name is missing')
    end
  end

  describe 'PUT /destinations/:id' do
    it 'updates the destination' do
      put "/api/destinations/#{destination.id}", params: { name: 'New Paris' }
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['destination']['name']).to eq('New Paris')
    end

    it 'returns 404 for missing record' do
      put "/api/destinations/9999", params: { name: 'Nowhere' }
      expect(response).to have_http_status(404)
    end
  end

  describe 'DELETE /destinations/:id' do
    it 'deletes the destination' do
      delete "/api/destinations/#{destination.id}"
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Destination deleted successfully')
    end

    it 'returns 404 for missing record' do
      delete "/api/destinations/9999"
      expect(response).to have_http_status(404)
    end
  end
end
