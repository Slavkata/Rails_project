class CreateEnemies < ActiveRecord::Migration[5.0]
  def change
    create_table :enemies do |t|
      t.string :name.string
      t.string :power.integer
      t.string :health.integer

      t.timestamps
    end
  end
end
