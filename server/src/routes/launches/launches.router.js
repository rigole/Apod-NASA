const express = require('express')
//const { launches } = require('../../models/launches.model')

const {
    httpGetAllLaunches,
} = require('./launches.controller')

const launchesRouter = express.Router()

launchesRouter.get('/launches', httpGetAllLaunches)

module.exports = launchesRouter