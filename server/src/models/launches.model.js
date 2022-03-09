const launchesDatabase = require('./launches.mongo')

const launches = new Map()

let latestFlightNumber = 100;

const launch = {
    flightNumber:100,
    mission: 'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date("December 27, 2030"),
    target: 'Kepler-442 b',
    customers:['FlashPayers', 'MINCOM'],
    upcoming: true,
    success:true,
}
//launches.set(launch.flightNumber, launch)

saveLaunch(launch)

async function saveLaunch(launch) {
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}


function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}

async function getAllLaunches() {
    return  launchesDatabase
        .find({}, {'__id':0, '__v':0})
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(launch.flightNumber,
        Object.assign(launch, {
            success: true,
            upcoming:true,
            customers:['FlashPayers', 'MINCOM'],
         flightNumber:  latestFlightNumber,
        })
    )
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}

module.exports ={
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}