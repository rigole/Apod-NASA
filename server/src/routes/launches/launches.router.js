const express = require('express')
//const { launches } = require('../../models/launches.model')

const {
    httpGetAllLaunches,
    httpAddNewLaunch,
} = require('./launches.controller')

const launchesRouter = express.Router()

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpAddNewLaunch)

module.exports = launchesRouter