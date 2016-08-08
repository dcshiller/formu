class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :title, null: false
      t.text :instructions
      t.integer :designer_id, null: false

      t.timestamps null: false
    end
    add_index :forms, :designer_id
  end

end
