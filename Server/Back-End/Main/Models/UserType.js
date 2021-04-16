"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserTypeSchema = new Schema({
  custom_id: { type: Number, required: true, unique: true },
  title_en: { type: String, required: true, unique: true },
  title_ar: { type: String, required: true, unique: true },
});

const UserType = mongoose.model("user_type", UserTypeSchema);
module.exports = UserType;
