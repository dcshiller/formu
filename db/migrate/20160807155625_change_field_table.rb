class ChangeFieldTable < ActiveRecord::Migration
  def change
    remove_column :form_fields, :type
    add_column :form_fields, :field_type, :string
  end
end
