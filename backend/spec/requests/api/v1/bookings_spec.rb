require 'rails_helper'

RSpec.describe 'Bookings API', type: :request do
  let!(:user) { create(:user) }
  let!(:destination) { create(:destination) }
  let!(:package) { create(:package) }
  let(:headers) { auth_headers(user) }

  let(:valid_booking_params) do
    {
      phone_number: '1234567890',
      address: 'Mirpur Dhaka',
      credit_card_number: '4111111111111111',
      booking_date: '2025-06-05',
      destination_id: destination.id
    }
  end

  describe 'GET /api/bookings' do
    it 'returns all bookings' do
      create(:booking, user: user, destination: destination)

      get '/api/bookings', headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body.first['address']).to eq('Mirpur Dhaka')
    end
  end

  describe 'POST /api/bookings' do
    it 'creates a booking with destination' do
      post '/api/bookings', params: valid_booking_params.to_json, headers: headers

      expect(response.status).to eq(201)
      expect(response.parsed_body['message']).to eq('Booking successful!')
      expect(response.parsed_body['booking']['destination_id']).to eq(destination.id)
    end

    it 'fails when both destination and package are present' do
      post '/api/bookings', params: valid_booking_params.merge(package_id: package.id).to_json, headers: headers

      expect(response.status).to eq(422)
      expect(response.parsed_body['mesage']).to eq('Booking must belong to either a destination or a package, not both.')
    end

    it 'fails when neither destination nor package are present' do
      invalid_params = valid_booking_params.except(:destination_id)

      post '/api/bookings', params: invalid_params.to_json, headers: headers

      expect(response.status).to eq(422)
      expect(response.parsed_body['message']).to eq('Booking must belong to either a destination or a package.')
    end
  end

  describe 'GET /api/bookings/check_booking' do
    it 'returns true if booking exists' do
      create(:booking, user: user, destination: destination)

      get "/api/bookings/check_booking?destination_id=#{destination.id}", headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body['has_booking']).to eq(true)
    end

    it 'returns false if booking does not exist' do
      get "/api/bookings/check_booking?destination_id=#{destination.id}", headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body['has_booking']).to eq(false)
    end
  end

  describe 'GET /api/bookings/my_bookings' do
    it 'returns bookings for current user' do
      create(:booking, user: user, destination: destination)

      get '/api/bookings/my_bookings', headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body['bookings'].size).to eq(1)
    end
  end

  describe 'PUT /api/bookings/:id' do
    let!(:booking) { create(:booking, user: user, destination: destination) }

    it 'updates the booking' do
      put "/api/bookings/#{booking.id}", params: { address: 'New Address' }.to_json, headers: headers

      expect(response.status).to eq(200)
      expect(response.parsed_body['booking']['address']).to eq('New Address')
    end

    it 'returns 404 if booking not found' do
      put "/api/bookings/9999", params: { address: 'Nowhere' }.to_json, headers: headers

      expect(response.status).to eq(404)
      expect(response.parsed_body['message']).to eq('Booking not found')
    end
  end
end
