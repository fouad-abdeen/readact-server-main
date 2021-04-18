const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    user_type_id: { type: Number, required: true },
    location_id: { type: Schema.ObjectId, ref: "locations", required: true },
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
    is_verified: Boolean,
    is_verification_requested: Boolean,
    is_profile_completed: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
