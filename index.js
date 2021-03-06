import dataOBJ from "./js/dataBase.js";
import {
  linesToArray,
  dataToSunPhases,
  addNSCDates
} from "./sources/astropixels/index.js";
import {
  linesToData,
  dataToMoonPhases
} from "./sources/calendario365/index.js";

let astroData = {
  sun: {},
  moon: {}
};

let config = {
  /**
   * @values ('json' | 'locale' | 'ms' | 'any' ) Output format of dates if not stablished beforehand
   */
  saveDatesAs: "ms",
};


// GLOBAL FUNCTIONS
function getTextLines(data) {
  return data.split("\n");
}

function addData(obj) {
  console.log({
    obj
  });
  astroData = {
    ...astroData,
    ...obj
  };
  return astroData;
}

function showData(data) {
  const elData = document.querySelector("#data");
  elData.innerHTML = JSON.stringify(data, null, 2);
  console.log(data);
  return data
}

//promise.then(x => { console.log(x)}).finally(showData)
// for every source prints dataOBJ in screen.
// need to fix so it only prints and logs info once
let files = []
for (let source in dataOBJ.sources) {
  let filesArr = dataOBJ.sources[source]['files']
  if (filesArr != undefined) {
    filesArr.forEach((url) => files.push(fetch(`${url}`)))
  }
}

Promise.all(files).
then(function (responses) {
  // returns a new array formed with .map()
  return Promise.all(responses.map(async function (response) {
    const url = response.url
    const txt = await response.text();
    return {
      url,
      txt
    }
  }));
}).then(function (arr) {
  arr.forEach((doc) => {
    if (doc.url.includes('/astropixels/')) {
      let data = linesToArray(
        getTextLines(doc.txt)
      )
      addData(
        addNSCDates(
          dataToSunPhases(data)
          )
        )
    } else if (doc.url.includes('/calendario365/')) {
      let data = linesToData(
        getTextLines(doc.txt)
        )
      addData(
        dataToMoonPhases(data)
        )
    } else {
      console.log(`need new code to extract infor from:\n ${doc.url}`)
    }
  })
}).catch(function (error) {
  // if there's an error, log it
  console.log(error);
}).finally(() => {
  showData({
    astroData
  })
});