const http = require('http')
const  app = require('./app')
// app.listen()

const server = http.createServer(app)


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})
const PORT = process.env.PORT || 8000;
console.log(PORT)

