class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :circle_x_pos, default: 100
      t.integer :circle_y_pos, default: 400
      t.integer :square_x_pos, default: 1100
      t.integer :square_y_pos, default: 400
      t.integer :index, default: 0
    end
  end
end
