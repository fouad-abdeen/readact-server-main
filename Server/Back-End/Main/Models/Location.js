const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  title_en: { type: String, required: true, unique: true },
  title_ar: { type: String, required: true, unique: true },
});

const Location = mongoose.model("locations", LocationSchema);
module.exports = Location;
