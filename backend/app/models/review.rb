class Review < ApplicationRecord
  belongs_to :user
  belongs_to :destination, optional: true
  belongs_to :package, optional: true

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validate :associated_with_one

  private

  def associated_with_one
    if destination_id.present? && package_id.present?
      errors.add(:base, "Review can only belong to a destination or a package, not both.")
    elsif destination_id.blank? && package_id.blank?
      errors.add(:base, "Review must belong to either a destination or a package.")
    end
  end
end
