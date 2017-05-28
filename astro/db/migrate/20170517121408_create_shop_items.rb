class CreateShopItems < ActiveRecord::Migration[5.0]
  def change
    create_table :shop_items do |t|
      t.string :name
      t.string :item_type
      t.integer :mainstat
      t.integer :secondarystat
      t.string :mainstat_name
      t.string :secondarystat_name
      t.integer :price
    end
  end
end
