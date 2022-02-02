const express = require('express')
const { launches } = require('../../models/launches.model')

const launchesRouter = express.Router()

launchesRouter.get('/launches', getAllLaunches)

module.exports = launchesRouter