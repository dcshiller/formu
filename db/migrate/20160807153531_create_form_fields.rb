class CreateFormFields < ActiveRecord::Migration
  def change
    create_table :form_fields do |t|
      t.string :type, null: false
      t.integer :form_id, null: false
      t.string :label
      t.text :instructions
      t.integer :position, null: false

      t.timestamps null: false
    end
    add_index :form_fields, :form_id
  end
end
