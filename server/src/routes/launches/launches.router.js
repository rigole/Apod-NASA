const express = require('express')
//const { launches } = require('../../models/launches.model')

const {
    getAllLaunches,
} = require('./launches.controller')

const launchesRouter = express.Router()

launchesRouter.get('/launches', getAllLaunches)

module.exports = launchesRouter