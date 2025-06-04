# spec/requests/api/v1/destinations_spec.rb
require 'rails_helper'

RSpec.describe 'Destinations API', type: :request do
  let!(:destination) { create(:destination) }

  describe 'GET /destinations' do
    it 'returns all destinations' do
      get '/api/destinations'

      expect(response.status).to eq(200)
      expect(response.parsed_body.first).to include(
        'name' => 'Paris',
        'description' => 'City of Light',
        'short_description' => 'Romantic city',
        'price' => '1200',
        'img_src' => 'paris.jpg'
      )
    end
  end

  describe 'GET /destinations/:id' do
    it 'returns the specific destination with given id' do
      get "/api/destinations/#{destination.id}"

      expect(response.status).to eq(200)
      json = response.parsed_body
      expect(response.parsed_body['destination']).to include(
        'name' => 'Paris',
        'description' => 'City of Light',
        'short_description' => 'Romantic city',
        'price' => '1200',
        'img_src' => 'paris.jpg'
      )
    end

    it 'returns 404 if destination with the give id is not found' do
      get "/api/destinations/9999"

      expect(response.status).to eq(404)
      expect(response.parsed_body['message']).to eq('Destination not found')
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

      expect(response.status).to eq(201)
      json = response.parsed_body
      expect(json['message']).to eq('Destination created successfully')
      expect(json['destination']).to include({
        'name' => 'Tokyo',
        'description' => 'Beautiful city',
        'short_description' => 'Culture and tech',
        'price' => '1500',
        'img_src' => 'tokyo.jpg'
      })
    end
  
    it 'returns 422 for invalid inputs' do
      post '/api/destinations', params: valid_params.except(:name).to_json, headers: headers

      expect(response.status).to eq(400)
      expect(response.parsed_body['error']).to eq('name is missing')
    end
  end

  describe 'PUT /destinations/:id' do
    it 'updates the destination' do
      put "/api/destinations/#{destination.id}", params: { name: 'New Paris' }

      expect(response.status).to eq(200)
      expect(response.parsed_body['destination']['name']).to eq('New Paris')
    end

    it 'returns 404 for if no record with the given id is found' do
      put "/api/destinations/9999", params: { name: 'Nowhere' }

      expect(response.status).to eq(404)
    end
  end

  describe 'DELETE /destinations/:id' do
    it 'deletes the destination' do
      delete "/api/destinations/#{destination.id}"

      expect(response.status).to eq(200)
      expect(response.parsed_body['message']).to eq('Destination deleted successfully')
    end

    it 'returns 404 for if no record with the given id is found' do
      delete "/api/destinations/9999"

      expect(response.status).to eq(404)
    end
  end
end
