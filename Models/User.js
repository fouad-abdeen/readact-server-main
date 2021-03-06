/* eslint-disable func-names */

const mongoose = require("mongoose");

const { Schema } = mongoose;

const crypto = require("crypto");

// const compare = require("secure-compare");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
    is_profile_completed: Boolean,
    is_verified: Boolean,
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return crypto.timingSafeEqual(Buffer.from(this.hash), Buffer.from(hash));
};

const User = mongoose.model("users", UserSchema);
module.exports = User;
