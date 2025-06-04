require 'rails_helper'

RSpec.describe 'Reviews API', type: :request do
  let!(:user) { create(:user) }
  let!(:destination) { create(:destination) }
  let!(:package) { create(:package) }
  let(:headers) { auth_headers(user) }

  describe 'GET /api/reviews' do
    before do
      create(:review, :for_destination, user: user, destination: destination)
      create(:review, :for_package, user: user, package: package)
    end

    it 'returns all reviews' do
      get '/api/reviews'

      expect(response.status).to eq(200)
      expect(response.parsed_body.length).to eq(2)
    end

    it 'filters reviews by destination_id' do
      get '/api/reviews', params: { destination_id: destination.id }

      expect(response.status).to eq(200)
      expect(response.parsed_body.length).to eq(1)
      expect(response.parsed_body.first['destination_id']).to eq(destination.id)
    end

    it 'filters reviews by package_id' do
      get '/api/reviews', params: { package_id: package.id }

      expect(response.status).to eq(200)
      expect(response.parsed_body.length).to eq(1)
      expect(response.parsed_body.first['package_id']).to eq(package.id)
    end
  end

  describe 'POST /api/reviews' do
    context 'with valid destination review' do
      let(:valid_params) do
        {
          rating: 5,
          comment: "had a good time",
          destination_id: destination.id
        }
      end

      it 'creates a destination review' do
        post '/api/reviews', params: valid_params, headers: headers, as: :json
    
        expect(response.status).to eq(201)
        expect(response.parsed_body['message']).to eq("Review has been created successfully")
        expect(response.parsed_body['review']['destination_id']).to eq(destination.id)
      end
    end

    context 'with valid package review' do
      it 'creates a package review' do
        post '/api/reviews', params: {
          rating: 4,
          comment: "had a good time",
          package_id: package.id
        }, headers: headers, as: :json

        expect(response.status).to eq(201)
        expect(response.parsed_body['review']['package_id']).to eq(package.id)
      end
    end

    context 'when both destination_id and package_id are provided' do
      it 'returns a 400 error due to exactly_one_of validation' do
        post '/api/reviews', params: {
          rating: 3,
          comment: "had a good time",
          destination_id: destination.id,
          package_id: package.id
        }, headers: headers, as: :json
    
        expect(response.status).to eq(400)
        expect(response.parsed_body['error']).to include("destination_id, package_id are mutually exclusive")
      end
    end

    context 'when neither destination_id nor package_id is provided' do
      it 'returns a 400 error from Grape validation' do
        post '/api/reviews', params: {
          rating: 2,
          comment: "Had a good time"
        }, headers: headers, as: :json
    
        expect(response.status).to eq(400)
        expect(response.parsed_body['error']).to include("destination_id, package_id are missing, exactly one parameter must be provided")
      end
    end
  end
end
