
const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs');
const isHabitablePlanets = [];



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
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    isHabitablePlanets.push(data)
                }

            })
            .on('error', (error) => {
                console.log(error)
                reject(error )
            })
            .on('end', () => {
                 console.log(`${isHabitablePlanets.length} habitables planets found`)
                resolve()
            })
    })
}

// parse()
module.exports = {
    loadPlanetsData,
    planets: isHabitablePlanets,
}