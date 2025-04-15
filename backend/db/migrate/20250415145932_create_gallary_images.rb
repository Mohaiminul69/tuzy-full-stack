class CreateGallaryImages < ActiveRecord::Migration[8.0]
  def change
    create_table :gallary_images do |t|
      t.string :img_src

      t.timestamps
    end
  end
end
