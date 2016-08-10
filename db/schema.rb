# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160810201249) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "form_field_choices", force: :cascade do |t|
    t.integer "form_field_id",   null: false
    t.string  "choice_text",     null: false
    t.integer "choice_position", null: false
  end

  add_index "form_field_choices", ["form_field_id"], name: "index_form_field_choices_on_form_field_id", using: :btree

  create_table "form_field_responses", force: :cascade do |t|
    t.integer "form_field_id",  null: false
    t.integer "response_id",    null: false
    t.text    "response_value"
  end

  add_index "form_field_responses", ["form_field_id"], name: "index_form_field_responses_on_form_field_id", using: :btree
  add_index "form_field_responses", ["response_id"], name: "index_form_field_responses_on_response_id", using: :btree

  create_table "form_fields", force: :cascade do |t|
    t.integer  "form_id",      null: false
    t.string   "label"
    t.text     "instructions"
    t.integer  "position",     null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "field_type"
  end

  add_index "form_fields", ["form_id"], name: "index_form_fields_on_form_id", using: :btree

  create_table "form_responses", force: :cascade do |t|
    t.integer  "form_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "form_responses", ["form_id"], name: "index_form_responses_on_form_id", using: :btree

  create_table "forms", force: :cascade do |t|
    t.string   "title",        null: false
    t.text     "instructions"
    t.integer  "designer_id",  null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "forms", ["designer_id"], name: "index_forms_on_designer_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "session_token"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
