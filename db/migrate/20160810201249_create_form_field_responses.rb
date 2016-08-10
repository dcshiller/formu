class CreateFormFieldResponses < ActiveRecord::Migration
  def change
    create_table :form_field_responses do |t|
      t.integer :form_field_id, null: false
      t.integer :response_id, null: false
      t.text :response_value
    end
    add_index :form_field_responses, :form_field_id
    add_index :form_field_responses, :response_id
  end
end
