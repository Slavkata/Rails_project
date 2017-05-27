class CreatePotions < ActiveRecord::Migration[5.0]
  def change
    create_table :potions do |t|
      t.integer :bonus_power
      t.integer :bonus_health
      t.string :owner
      t.integer :used

      t.timestamps
    end
  end
end
