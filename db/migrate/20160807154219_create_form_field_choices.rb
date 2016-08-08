class CreateFormFieldChoices < ActiveRecord::Migration
  def change
    create_table :form_field_choices do |t|
      t.integer :form_field_id, null: false
      t.string :choice_text, null: false
      t.integer :choice_position, null: false
    end

    add_index :form_field_choices, :form_field_id
  end
end
