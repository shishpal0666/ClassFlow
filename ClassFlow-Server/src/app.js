const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");

const port = 3000;

const app = express();

// Json to JS object Middleware
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Define routes order
const { authRoute } = require("./routes/auth");
const { profileRoute } = require("./routes/profile");

// express routes
app.use("/", authRoute);
app.use("/", profileRoute);

connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
