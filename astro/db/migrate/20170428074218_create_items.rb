class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :type
      t.string :mainstat_name
      t.string :secondarystat_name
      t.boolean :equipped, default: false
      t.integer :mainstat
      t.integer :secondarystat
      t.string :owner
    end
  end
end
