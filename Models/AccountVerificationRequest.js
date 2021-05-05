const mongoose = require("mongoose");

const { Schema } = mongoose;

const AccountVerificationRequestSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  email_address: { type: String, required: true, unique: true },
  request_date: { type: Date, required: true },
});

const AccountVerificationRequest = mongoose.model(
  "account_verification_requests",
  AccountVerificationRequestSchema
);

module.exports = AccountVerificationRequest;
