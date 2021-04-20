"use strict";

require("./database");

const express = require("express");
const cors = require("cors");

const routes = require("./WebAPI/Controllers/DataController");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/data", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
