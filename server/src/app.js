const express = require('express')
const cors = require('cors')

const path = require('path')


const app = express ()
const morgan = require('morgan')
const planetsRouter = require('./routes/planets/planets.router')

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(planetsRouter)

module.exports = app