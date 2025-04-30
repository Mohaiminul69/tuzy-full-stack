class User < ApplicationRecord
  has_secure_password

  has_many :bookings
  has_many :reviews
  has_many :booked_destinations, through: :bookings, source: :destination
  has_many :booked_packages, through: :bookings, source: :package

  validates :email, presence: true, uniqueness: true
end
