const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')
const axios = require('axios')


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
const SPACEX_API_URL = 'https://api.spacexdata.com/V4/launches/query'
async function loadLaunchData() {
    console.log('Downloading launch data');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options:{
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }

                }
            ]
        }
    })
}

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


async function existsLaunchWithId(launchId) {
    return launchesDatabase.findOne({
        flightNumber: launchId
    });
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

async function abortLaunchById(launchId) {
    //const aborted = launches.get(launchId)
    //aborted.upcoming = false
    //aborted.success = false
    //return aborted

    const aborted = await  launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.ok === 1 && aborted.nModified ===1;

}

module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    //addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,
}