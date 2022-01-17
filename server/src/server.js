const http = require('http')
const  app = require('./app')
// app.listen()

const server = http.createServer(app)
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})

console.log(PORT)

