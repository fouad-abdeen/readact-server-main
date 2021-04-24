/* eslint-disable class-methods-use-this */

require("dotenv").config();

const { DB } = process.env;
const mongoose = require("mongoose");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(() => {
        console.error("Database connection error");
      });
  }
}

module.exports = new Database();
