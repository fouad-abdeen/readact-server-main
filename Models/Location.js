const mongoose = require("mongoose");

const { Schema } = mongoose;

const LocationSchema = new Schema({
  title_en: { type: String, required: true, unique: true },
  title_ar: { type: String, required: true, unique: true },
  editable: { type: Boolean, required: true },
  deletable: { type: Boolean, required: true },
});

const Location = mongoose.model("locations", LocationSchema);
module.exports = Location;
