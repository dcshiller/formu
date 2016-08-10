class Createformresponses < ActiveRecord::Migration
  def change
    create_table :form_responses do |t|
    t.integer :form_id, null: false

    t.timestamps null: false
  end
  add_index :form_responses, :form_id
  end

end
