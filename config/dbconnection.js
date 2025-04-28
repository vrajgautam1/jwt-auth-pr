const mongoose = require('mongoose');

require('dotenv').config();
const dburl = process.env.DB_URL

const db = async()=>{
    try {
        await mongoose.connect(dburl)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed")
        console.log(error.message)
    }
}

module.exports = db;    