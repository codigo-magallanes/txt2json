let config = {
  /**
   * @values ['json', 'locale', 'ms', any] Output format of dates if not stablished beforehand
   */
  saveDatesAs: "ms",
};

let dataOBJ = {
  sources: {
    nodata: { },
    astropixels: {
      url: "http://astropixels.com/",
      files: [
        "./sun_2001-2050(equinox-solstice)(astropixels).txt",
        "./sun_2051-2100(equinox-solstice)(astropixels).txt",
      ],
    },
    calendario365: {
      url: "https://www.calendario-365.es/luna/lunar-fases.html",
      files: [
        "./moon_2020(calendario365).txt",
        "./moon_2021(calendario365).txt",
      ],
    },
  },
  moon: {},
  sun: {},
};

const sunPhases = ["equiNorth", "solsNorth", "equiSouth", "solsSouth"];

const monthNamesEN = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const monthNamesES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
let monthNames = new Map([
  ["EN", monthNamesEN],
  ["ES", monthNamesES],
]);

// better with an object than a map()
// or call only the array
const moonPhasesEN = [
  "full moon",
  "new moon",
  "crescent quarter",
  "last quarter",
];
const moonPhasesES = [
  "luna llena",
  "luna nueva",
  "cuarto creciente",
  "cuarto menguante",
];
const moonPhasesNames = {
  moonPhasesEN,
  moonPhasesES,
};

function saveDate({ year, date, UTCTime, format, lang }) {
  let dateTime = lang ? monthNameToEng(lang, date) : date;
  let setDate = formDate({ year, dateTime, UTCTime });
  console.log({ dateTime, setDate });
  return saveThisDate(setDate, format);
}

function formDate({ year, dateTime, UTCTime }) {
  let arr = [dateTime];
  if (year) arr.unshift(year);
  if (UTCTime) arr.push("Z");
  console.log({ arr });
  return arr.join(" ");
}

function monthNameToEng(lang, dateTime) {
  let monthNamesArr = monthNames.get(lang);
  let eng = monthNames.get("EN");
  monthNamesArr.forEach((m, i) => {
    if (dateTime.includes(m.toLowerCase())) {
      dateTime = dateTime.replace(m, eng[i]);
    }
  });
  return dateTime;
}

function saveThisDate(thisDate, format) {
  let d = new Date(thisDate);
  console.log({ thisDate, format, d });
  switch (format ? format : config.saveDatesAs) {
    case "ms":
      date = Date.parse(d);
      break;
    case "json":
      date = d.toJSON();
      break;
    case "ISO":
      date = d.toISOString();
      break;
    case "locale":
      date = d;
      break;
    default:
      date = d.toLocaleDateString();
  }
  return date;
}

/**
 * ** PROMISES **
 */

// GLOBAL
function getTextLines(data) {
  return data.split("\n");
}

function showData(data) {
  const elData = document.querySelector("#data");
  elData.innerHTML = JSON.stringify(data, null, 2);
  console.log(data);
}

// NO-DATA
function noData(source) {
  let msg = 'need some more code to extract data from source.'
  dataOBJ.sources[source]['error'] = msg
}

// CALENDARIO365
function linesToData(arr) {
  return arr.map((line) => line.trim().replace(/\t/g, ",").split(","));
}

// Split into smaller functions doing small tasks
function dataToMoonPhases(arr) {
  // Get year as last word from first line
  let year, columns;
  year = arr.shift();
  year = year[0].split(" ").pop();
  console.log({ year });
  columns = arr.shift();
  dataOBJ.moon[year] = [];
  arr.forEach((a) => {
    if (a.length == 4) {
      let dist = Number(a[3].match(/(\d+)/g).join(""));
      let phase, special;
      // Need to translate to other languages...
      if (a[0] == "(Superluna)") {
        phase = "luna llena";
        special = "super luna";
      } else {
        phase = a[0].toLowerCase();
        special = "";
      }

      let obj = {
        gregDate: saveDate({
          date: a[1] + " " + a[2],
          UTCTime: true,
          format: "locale",
          lang: "ES",
        }),
        dist,
        phase,
        special,
      };
      dataOBJ.moon[year].push(obj);
    }
  });
  return dataOBJ;
}

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
      dataOBJ.sun[year] = { ...phases };
    } else {
      console.log({ year });
    }
  });
  return dataOBJ;
}

function noSourcesFound(data) {
  const elNoData = document.querySelector("#no-data");
  elNoData.innerHTML = data;
  console.log(data);
}

// for every source prints dataOBJ in screen.
// need to fix so it only prints and logs info once
for (source in dataOBJ.sources) {
  switch (source) {
    case "astropixels":
      dataOBJ.sources.astropixels.files.forEach((url) => {
        fetch(url)
          .then((res) => res.text())
          .then(getTextLines)
          .then(linesToArray)
          .then(dataToSunPhases)
          .then(showData);
      });
      break;
    case "calendario365":
      dataOBJ.sources.calendario365.files.forEach((url) => {
        fetch(url)
          .then((res) => res.text())
          .then(getTextLines)
          .then(linesToData)
          .then(dataToMoonPhases)
          .then(showData);
      });
      break;
    default:
      noData(source)
  }
}
