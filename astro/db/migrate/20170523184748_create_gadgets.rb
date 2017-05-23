class CreateGadgets < ActiveRecord::Migration[5.0]
  def change
    create_table :gadgets do |t|
      t.string :name.string
      t.string :bonus_health.integer
      t.string :bonus_power.integer
      t.string :owner.string

      t.timestamps
    end
  end
end
