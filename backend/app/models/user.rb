class User < ApplicationRecord
  has_secure_password

  has_many :bookings
  has_many :reviews
  has_many :booked_destinations, through: :bookings, source: :destination
  has_many :booked_packages, through: :bookings, source: :package

  validates :first_name, :last_name, :date_of_birth, :img_src, presence: true
  validates :email, presence: true, uniqueness: true
end
