const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

// Cors Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Json to JS object Middleware
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());


// Define routes order
const { authRoute } = require("./routes/auth");
const { profileRoute } = require("./routes/profile");
const { quesRoute } = require("./routes/createQues");
const { ansRoute } = require("./routes/submitAns");

// express routes
app.use("/", authRoute);
app.use("/", profileRoute);
app.use("/", quesRoute);
app.use("/", ansRoute);

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
