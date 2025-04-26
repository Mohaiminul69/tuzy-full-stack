class AddColumnToPackages < ActiveRecord::Migration[8.0]
  def change
    add_column :packages, :short_description, :string
  end
end
