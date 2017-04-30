class CreateCharacters < ActiveRecord::Migration[5.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :armor, default: 0
      t.integer :power, default: 20
      t.integer :health, default: 320
      t.string :owner
    end
  end
end
