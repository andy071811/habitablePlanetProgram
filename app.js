import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

const habitablePlanets = [];

const isHabitablePlanet = planet => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

createReadStream('keplerData.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', data => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data)
        }
    })
    .on('error', err => {
        console.log(err)
    })
    .on('end', () => {
        const planetNames = habitablePlanets.map(planet => {
            return planet['kepler_name']
        })
        console.log(`${habitablePlanets.length} habitable planets found! Here is a list of those planets: ${planetNames}`);
        console.log("All done");
    })

