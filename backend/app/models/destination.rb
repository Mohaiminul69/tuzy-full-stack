class Destination < ApplicationRecord
  has_many :bookings
  has_many :reviews
  has_many :users, through: :bookings

  validates :name, :description, :short_description, :img_src, :price, presence: true
  validates :name, :img_src, uniqueness: true
  validates :price, numericality: { greater_than: 0 }
  validates :description, length: { minimum: 10 }
  validates :short_description, length: { minimum: 5 }
end
