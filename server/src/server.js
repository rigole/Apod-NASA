const http = require('http')
const  app = require('./app')
const mongoose = require('mongoose')
// app.listen()


const { loadPlanetsData } = require('./models/planets.model')

const MONGO_URL = "mongodb+srv://plass:123@nasa-cluster.exsxa.mongodb.net/nasaDatabase?retryWrites=true&w=majority"

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

/*mongoose.connection.once('open', () => {
    console.log("MongoDB connection ready ")
})
mongoose.connection.on('error', (error) =>{
    console.error(error);
})*/

async function startServer(){

    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false
    });
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer();
