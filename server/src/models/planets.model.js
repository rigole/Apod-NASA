const path = require('path');
const fs = require('fs');
const isHabitablePlanets = [];
const  { parse } = require('csv-parse');

const planets = require('./planets.mongo')




function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: "#",
                columns: true,
            }))
            .on('data',  async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data)
                }

            })
            .on('error', (error) => {
                console.log(error)
                reject(error )
            })
            .on('end',  async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitables planets found`)
                resolve()
            })
    })
}

async function getAllPlanets(){
    return planets.find({}, {
        '__id':0, '__v':0,
    });

}

async function savePlanet(planet){
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert:  true,
        })
    } catch (error) {

        console.log("Could not log Planet" + error)
    }

}

// parse()
module.exports = {
    loadPlanetsData,
    getAllPlanets,
}