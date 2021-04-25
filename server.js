require("./database");

const express = require("express");
const cors = require("cors");

const routes = require("./WebAPI/Controllers/DataController");

const app = express();

// CORS Middleware
app.use(cors());

// JSON Parsing Middleware
app.use(express.json());

app.use("/api/data", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
