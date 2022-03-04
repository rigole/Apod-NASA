const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
    kelplerName : {
       type: String,
       required: true,
    }
})