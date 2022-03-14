const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')


const launches = new Map()

//let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

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
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet){
        throw new Error("No matching planet found")
    }

    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}


function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber')


    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return  launchesDatabase
        .find({}, {'__id':0, '__v':0})
}

/*function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(launch.flightNumber,
        Object.assign(launch, {
            success: true,
            upcoming:true,
            customers:['FlashPayers', 'MINCOM'],
         flightNumber:  latestFlightNumber,
        })
    )
}*/

async function scheduleNewLaunch() {

    const newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {

        success: true,
        upcoming: true,
        customers: ['FlashPayers', 'MINCOM'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch)

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
    //addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,
}