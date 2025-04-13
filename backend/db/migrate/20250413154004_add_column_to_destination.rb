class AddColumnToDestination < ActiveRecord::Migration[8.0]
  def change
    add_column :destinations, :short_description, :string
  end
end
