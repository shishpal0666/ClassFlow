const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    await mongoose.connect(
        process.env.CLASS_FLOW_DB
    );
};

module.exports = { connectDB };