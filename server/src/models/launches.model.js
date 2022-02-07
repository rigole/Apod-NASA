const launches = new Map()

let latestFlightNumber = 100;

const launch = {
    flightNumber:100,
    mission: 'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date("December 27, 2030"),
    destination: 'Kepler-442 b',
    customer:['FlashPayers', 'MINCOM'],
    upcoming: true,
    success:true,
}
launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
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

module.exports ={
    getAllLaunches,
    addNewLaunch
}