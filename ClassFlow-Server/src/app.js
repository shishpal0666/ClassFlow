const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
require("dotenv").config();

const port = process.env.PORT || 3000;


const http = require('http');
const { initSocket } = require('./socket');
const app = express();
const server = http.createServer(app);

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
const { historyRoute } = require("./routes/history");

// express routes
app.use("/", authRoute);
app.use("/", profileRoute);
app.use("/", quesRoute);
app.use("/", ansRoute);
app.use("/", historyRoute);


connectDB()
  .then(() => {
    console.log("Database connection Established...");
    const io = initSocket(server);
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
    server.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
