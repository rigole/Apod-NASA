const http = require('http')
const  app = require('./app')
// app.listen()


const { loadPlanetsData } = require('./models/planets.model')

const MONGO_URL = "mongodb+srv://plass:123@nasa-cluster.exsxa.mongodb.net/nasaDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer(){
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer();
