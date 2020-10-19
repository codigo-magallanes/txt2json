import { sunPhases, saveDate, setTimeToZero, setDayOfYear } from '/js/dates.js'
import { componerAsync, getTextLines, muestraDatos } from '/js/utils.js'

// ASTROPIXELS
function linesToArray(arr) {
  return arr.map((line) =>
    line
      .trim()
      .replace(/\s{5,6}|\t/g, ",")
      .split(",")
  );
}

function dataToSunPhases(arr) {
  let sunData = {};
  let i, year
  arr.forEach((a) => {
    year = Number(a[0]);
    if (year > 0) {
      let gregDate,
        phases = {};
      for (i = 0; i <= sunPhases.length - 1; i++) {
        let obj = {
          year,
          date: `${a[i + 1]}`,
          UTCTimeZone: '000Z',
          format: "json",
        };
        gregDate = saveDate(obj);

        phases[sunPhases[i]] = { gregDate };
      }
      sunData[year] = { ...phases };
    } else {
    }
  });
  console.log({ sunData })
  return sunData;
}

function addNSCDates(sunData) {
  let newYearsDate, year, d, obj = {}
  for (year in sunData) {
    obj = sunData[year]
    newYearsDate = setTimeToZero(obj[sunPhases[0]].gregDate)

    obj['newYearsDate'] = newYearsDate

    obj[sunPhases[0]]['day'] = setDayOfYear(obj[sunPhases[0]].gregDate, newYearsDate)
    obj[sunPhases[1]]['day'] = setDayOfYear(obj[sunPhases[1]].gregDate, newYearsDate)
    obj[sunPhases[2]]['day'] = setDayOfYear(obj[sunPhases[2]].gregDate, newYearsDate)
    obj[sunPhases[3]]['day'] = setDayOfYear(obj[sunPhases[3]].gregDate, newYearsDate)

    //newYearsDate = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate())
    //console.log({year, newYearsDate, obj})
    sunData[year] = obj
  }
  console.log({ sun: sunData })
  return { sun: sunData }
}


const astroPixelsFuncs = componerAsync(getTextLines, linesToArray, dataToSunPhases, addNSCDates, muestraDatos);


export { astroPixelsFuncs };
