const moongose = require('mongoose');
const mongoose = require("mongoose");

moongose.connection.once('open', () => {
    console.log("MongoDB connection ready!")
})


mongoose.connection.on("error", (err) => {
    console.error(err);
})