const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true  
    },
    password: {
        type: String,
        required: true,
        trim: true  
    },
    email: String,
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const user = mongoose.model("user", schema);
module.exports = user;