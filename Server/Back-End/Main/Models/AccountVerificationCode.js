const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountVerificationCodeSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  email_address: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  request_date: { type: Date, required: true },
  is_expired: { type: Boolean, required: true },
});

const AccountVerificationCode = mongoose.model(
  "account_verification_codes",
  AccountVerificationCodeSchema
);
module.exports = AccountVerificationCode;
