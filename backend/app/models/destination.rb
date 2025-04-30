class Destination < ApplicationRecord
  has_many :bookings
  has_many :reviews
  has_many :users, through: :bookings
end
