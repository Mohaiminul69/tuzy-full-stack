require 'rails_helper'

RSpec.describe 'Packages API', type: :request do
  let!(:package) { create(:package) }
  let(:headers) { { 'CONTENT_TYPE' => 'application/json' } }

  describe 'GET /packages' do
    it 'returns all packages' do
      get '/api/packages'

      expect(response.status).to eq(200)
      expect(response.parsed_body.first).to include(
        'name' => package.name,
        'price' => package.price,
        'description' => package.description,
        'short_description' => package.short_description,
        'img_src' => package.img_src
      )
    end
  end

  describe 'GET /packages/:id' do
    it 'returns the specific package' do
      get "/api/packages/#{package.id}"

      expect(response.status).to eq(200)
      expect(response.parsed_body['package']).to include(
        'name' => package.name,
        'price' => package.price,
        'description' => package.description,
        'short_description' => package.short_description,
        'img_src' => package.img_src
      )
    end

    it 'returns 404 if package is not found' do
      get '/api/packages/9999'

      expect(response.status).to eq(404)
      expect(response.parsed_body['message']).to eq('Package not found')
    end
  end

  describe 'POST /packages' do
    let(:valid_params) do
      {
        name: 'Good Package',
        price: '5000',
        description: 'A very good trip',
        short_description: 'Very good travel',
        img_src: 'abc.jpg'
      }
    end

    it 'creates a new package' do
      post '/api/packages', params: valid_params.to_json, headers: headers

      expect(response.status).to eq(201)
      expect(response.parsed_body['message']).to eq('Package has been created successfully')
      expect(response.parsed_body['package']['name']).to eq('Good Package')
    end

    it 'returns 422 for invalid input' do
      post '/api/packages', params: valid_params.except(:name).to_json, headers: headers

      expect(response.status).to eq(400)
      expect(response.parsed_body['error']).to include('name is missing')
    end
  end

  describe 'PUT /packages/:id' do
    it 'updates an existing package' do
      put "/api/packages/#{package.id}", params: { name: 'Updated Name' }.to_json, headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body['package']['name']).to eq('Updated Name')
    end

    it 'returns 404 if package not found' do
      put '/api/packages/9', params: { name: 'Invalid' }.to_json, headers: headers

      expect(response.status).to eq(404)
      expect(response.parsed_body['message']).to eq('Package not found')
    end
  end

  describe 'DELETE /packages/:id' do
    it 'deletes the package' do
      delete "/api/packages/#{package.id}"

      expect(response.status).to eq(200)
      expect(response.parsed_body['message']).to eq('Package deleted successfully')
    end

    it 'returns 404 if package not found' do
      delete '/api/packages/9'

      expect(response.status).to eq(404)
      expect(response.parsed_body['message']).to eq('Package not found')
    end
  end
end
