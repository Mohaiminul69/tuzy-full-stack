require 'rails_helper'

RSpec.describe 'GallaryImages API', type: :request do
  let!(:gallary_images) { create_list(:gallary_image, 3) }
  let(:gallary_image_id) { gallary_images.first.id }

  describe 'GET /api/gallary_images' do
    it 'returns all gallary images' do
      get '/api/gallary_images'

      expect(response.status).to eq(200)
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe 'GET /api/gallary_images/:id' do
    context 'when the gallary image exists' do
      it 'returns the gallary image' do
        get "/api/gallary_images/#{gallary_image_id}"

        expect(response.status).to eq(200)
        expect(response.parsed_body['message']).to eq("Gallary image found successfully")
        expect(response.parsed_body['gallary_image']['id']).to eq(gallary_image_id)
      end
    end

    context 'when the gallary image does not exist' do
      it 'returns 404' do
        get "/api/gallary_images/0"

        expect(response.status).to eq(404)
        expect(response.parsed_body['message']).to eq("Gallary image not found")
      end
    end
  end

  describe 'POST /api/gallary_images' do
    let(:valid_attributes) { { img_src: "abc.jpg" } }

    context 'when the request is valid' do
      it 'creates a gallary image' do
        post '/api/gallary_images', params: valid_attributes

        expect(response.status).to eq(201)
        expect(response.parsed_body['message']).to eq("Gallary image created successfully")
        expect(response.parsed_body['gallary_image']['img_src']).to eq(valid_attributes[:img_src])
      end
    end

    context 'when the request is invalid' do
      it 'returns a validation failure message' do
        post '/api/gallary_images', params: { img_src: "" }

        expect(response.status).to eq(422)
        expect(response.parsed_body['message']).to eq("Failed to create a gallary image")
      end
    end
  end

  describe 'PUT /api/gallary_images/:id' do
    let(:valid_attributes) { { img_src: "abc.jpg" } }

    context 'when the record exists' do
      it 'updates the record' do
        put "/api/gallary_images/#{gallary_image_id}", params: valid_attributes

        expect(response.status).to eq(200)
        expect(response.parsed_body['message']).to eq("Gallary image updated successfully")
        expect(response.parsed_body['gallary_image']['img_src']).to eq(valid_attributes[:img_src])
      end
    end

    context 'when the record does not exist' do
      it 'returns 404' do
        put "/api/gallary_images/0", params: valid_attributes

        expect(response.status).to eq(404)
        expect(response.parsed_body['message']).to eq("Gallary image not found")
      end
    end

    context 'when update fails validation' do
      it 'returns validation errors' do
        put "/api/gallary_images/#{gallary_image_id}", params: { img_src: "" }

        expect(response.status).to eq(422)
        expect(response.parsed_body['message']).to eq("Failed to update the gallay image")
        expect(response.parsed_body['errors']).to include("Img src can't be blank")
      end
    end
  end

  describe 'DELETE /api/gallary_images/:id' do
    context 'when the record exists' do
      it 'deletes the record' do
        delete "/api/gallary_images/#{gallary_image_id}"

        expect(response.status).to eq(200)
        expect(response.parsed_body['message']).to eq("Image deleted successfully")
      end
    end

    context 'when the record does not exist' do
      it 'returns 404' do
        delete "/api/gallary_images/0"

        expect(response.status).to eq(404)
        expect(response.parsed_body['message']).to eq("Failed to find image")
      end
    end
  end
end
