class CreateDestinations < ActiveRecord::Migration[8.0]
  def change
    create_table :destinations do |t|
      t.string :name
      t.text :description
      t.string :price
      t.string :img_src

      t.timestamps
    end
  end
end
