class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :destination, optional: true
  belongs_to :package, optional: true

  enum :status, { pending: 0, approved: 1, cancelled: 2 }

  validates :phone_number, presence: true
  validates :address, presence: true
  validates :credit_card_number, presence: true
  validates :booking_date, presence: true

  validate :destination_or_package_present

  private

  def destination_or_package_present
    if destination_id.blank? && package_id.blank?
      errors.add(:base, "Booking must belong to either a destination or a package.")
    elsif destination_id.present? && package_id.present?
      errors.add(:base, "Booking cannot belong to both a destination and a package.")
    end
  end  
end
