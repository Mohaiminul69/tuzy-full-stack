class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :destination
  belongs_to :package
end
