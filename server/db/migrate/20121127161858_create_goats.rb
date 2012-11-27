class CreateGoats < ActiveRecord::Migration
  def change
    create_table :goats do |t|
      t.string :name
      t.integer :age
      t.integer :hotwater_bottles_eaten

      t.timestamps
    end
  end
end
