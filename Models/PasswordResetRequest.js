const mongoose = require("mongoose");

const { Schema } = mongoose;

const PasswordResetRequestSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  completed: { type: Boolean, required: true },
  request_date: { type: Date, required: true },
});

const PasswordResetRequest = mongoose.model(
  "password_reset_requests",
  PasswordResetRequestSchema
);

module.exports = PasswordResetRequest;
