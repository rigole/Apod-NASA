//const moongose = require('mongoose');
const mongoose = require("mongoose");

mongoose.connection.once('open', () => {
    console.log("MongoDB connection ready!")
})

const MONGO_URL = "mongodb+srv://plass:123@nasa-cluster.exsxa.mongodb.net/nasaDatabase?retryWrites=true&w=majority"

mongoose.connection.on("error", (err) => {
    console.error(err);
})


async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

async function mongoDisconnect(){

    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}