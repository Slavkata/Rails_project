class CreateGadgets < ActiveRecord::Migration[5.0]
  def change
    create_table :gadgets do |t|
      t.string :name
      t.string :owner
      t.integer :bonus_health
      t.integer :bonus_power
      t.integer :equipped

      t.timestamps
    end
  end
end
