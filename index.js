import dataOBJ from "./js/dataBase.js";
import { linesToArray, dataToSunPhases, addNSCDates } from "./sources/astropixels/index.js";
import { linesToData, dataToMoonPhases } from "./sources/calendario365/index.js";

let astroData = {};
let config = {
  /**
   * @values ('json' | 'locale' | 'ms' | 'any' ) Output format of dates if not stablished beforehand
   */
  saveDatesAs: "ms",
};

/**
 * ** PROMISES **
 */

// GLOBAL
function getTextLines(data) {
  return data.split("\n");
}

function addData(obj) {
  console.log({ obj });
  astroData = { ...astroData, ...obj };
  return astroData;
}

function showData(data) {
  const elData = document.querySelector("#data");
  elData.innerHTML = JSON.stringify(data, null, 2);
  console.log(data);
}

// NO-DATA
function noData(source) {
  let msg = "need some more code to extract data from source.";
  dataOBJ.sources[source]["error"] = msg;
}

// for every source prints dataOBJ in screen.
// need to fix so it only prints and logs info once
let source;
for (source in dataOBJ.sources) {
  switch (source) {
    case "astropixels":
      dataOBJ.sources.astropixels.files.forEach((url) => {
        fetch(url)
          .then((res) => res.text())
          .then(getTextLines)
          .then(linesToArray)
          .then(dataToSunPhases)
          .then(addNSCDates)
          .then(addData)
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
          .then(addData)
          .then(showData);
      });
      break;
    default:
      noData(source);
  }
}
