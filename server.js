const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

//dot env configuration
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/api", (req, res) => {
  return res.status(200).send("Server started");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`.white.bgCyan);
});
