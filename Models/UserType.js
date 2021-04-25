const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserTypeSchema = new Schema({
  custom_id: { type: Number, required: true, unique: true },
  title_en: { type: String, required: true, unique: true },
  title_ar: { type: String, required: true, unique: true },
});

const UserType = mongoose.model("user_types", UserTypeSchema);
module.exports = UserType;
