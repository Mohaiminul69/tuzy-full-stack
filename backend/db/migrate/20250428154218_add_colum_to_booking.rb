class AddColumToBooking < ActiveRecord::Migration[8.0]
  def change
    add_column :bookings, :phone_number, :string, null: false
    add_column :bookings, :address, :string, null: false
    add_column :bookings, :credit_card_number, :string, null: false
    add_column :bookings, :booking_date, :date, null: false
  end
end
