# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_30_154214) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "destination_id"
    t.bigint "package_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone_number", null: false
    t.string "address", null: false
    t.string "credit_card_number", null: false
    t.date "booking_date", null: false
    t.index ["destination_id"], name: "index_bookings_on_destination_id"
    t.index ["package_id"], name: "index_bookings_on_package_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "destinations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "price"
    t.string "img_src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "short_description"
  end

  create_table "gallary_images", force: :cascade do |t|
    t.string "img_src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "packages", force: :cascade do |t|
    t.string "name"
    t.string "price"
    t.string "description"
    t.string "img_src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "short_description"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "destination_id"
    t.bigint "package_id"
    t.integer "rating", null: false
    t.text "comment", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["destination_id"], name: "index_reviews_on_destination_id"
    t.index ["package_id"], name: "index_reviews_on_package_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "img_src"
    t.date "date_of_birth"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bookings", "destinations"
  add_foreign_key "bookings", "packages"
  add_foreign_key "bookings", "users"
  add_foreign_key "reviews", "destinations"
  add_foreign_key "reviews", "packages"
  add_foreign_key "reviews", "users"
end
