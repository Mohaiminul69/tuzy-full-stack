class CreateBookings < ActiveRecord::Migration[8.0]
  def change
    create_table :bookings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :destination, null: true, foreign_key: true
      t.references :package, null: true, foreign_key: true

      t.timestamps
    end
  end
end
