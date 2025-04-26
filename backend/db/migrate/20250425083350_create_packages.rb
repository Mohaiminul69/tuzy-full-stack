class CreatePackages < ActiveRecord::Migration[8.0]
  def change
    create_table :packages do |t|
      t.string :name
      t.string :price
      t.string :description
      t.string :img_src

      t.timestamps
    end
  end
end
