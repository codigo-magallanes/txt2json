import { sunPhases, saveDate } from '/js/dates.js'

let sunData = {}
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
  let obj = {},
    i,
    year;
  arr.forEach((a) => {
    year = Number(a[0]);
    if (year > 0) {
      let gregDate,
        phases = {};
      for (i = 0; i <= sunPhases.length - 1; i++) {
        let obj = {
          year,
          date: `${a[i + 1]}`,
          format: "json",
          lang: "",
        };
        gregDate = saveDate(obj);

        phases[sunPhases[i]] = {
          gregDate,
        };
      }
      sunData[year] = { ...phases };
    } else {
    }
  });
  console.log({sunData})
  return { sun: sunData};
}

export { dataToSunPhases, linesToArray };
