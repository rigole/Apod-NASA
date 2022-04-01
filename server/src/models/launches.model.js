const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')
const axios = require('axios')


const launches = new Map()

//let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

/*const launch = {
    flightNumber:100,
    mission: 'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date("December 27, 2030"),
    target: 'Kepler-442 b',
    customers:['FlashPayers', 'MINCOM'],
    upcoming: true,
    success:true,
}*/
//launches.set(launch.flightNumber, launch)

//saveLaunch(launch)

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches(){
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

    if (response.status !== 200){
        console.log("Problem downloading launch data");
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs ){
        const payloads = launchDoc['payloads'];
        const customers =  payloads.flatMap((payload) => {
            return payload['customers'];
        })
        const launch = {
            flightNumber : launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket:launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }

        console.log(`${launch.flightNumber} ${launch.mission}`)

        await saveLaunch(launch)
    }
}



async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    })
    if (firstLaunch){
        console.log('Launch data already loaded')
        return;
    } else{
        await populateLaunches();
    }
    //console.log('Downloading launch data');

}

async function saveLaunch(launch) {
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}

async function findLaunch(filter) {
    return launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return findLaunch({
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

async function getAllLaunches(skip, limit) {
    return  launchesDatabase
        .find({}, {'__id':0, '__v':0})
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit);
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
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet){
        throw new Error("No matching planet found")
    }

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