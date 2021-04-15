const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CreateUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type_id: { type: Schema.ObjectId, ref: "user_type" },
    location_id: { type: Schema.ObjectId, ref: "location" },
    first_name_en: String,
    first_name_ar: String,
    last_name_en: String,
    last_name_ar: String,
    email_address: {
      type: String,
      lowercase: true,
    },
    mobile_number: String,
    full_address_en: String,
    full_address_ar: String,
  },
  { timestamps: true }
);

const CreateUser = mongoose.model("users", CreateUserSchema);
module.exports = CreateUser;
