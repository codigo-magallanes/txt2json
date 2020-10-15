import dataOBJ from "./sources/sources.js";
import { addArrays, muestraDatos } from '/js/utils.js'
import { astroPixelsFuncs } from "./sources/astropixels/index.js";
import { calendario365Funcs } from "./sources/calendario365/index.js";


let config = {
  /**
   * @values ('json' | 'locale' | 'ms' | 'any' ) Output format of dates if not stablished beforehand
   */
  saveDatesAs: "ms",
};

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
  return Promise.all(arr.map(function(doc) {
    if (doc.url.includes('/astropixels/')) {
      return astroPixelsFuncs(doc.txt);
    } else if (doc.url.includes('/calendario365/')) {
      return calendario365Funcs(doc.txt);
    } else {
      console.log(`need new code to extract infor from:\n ${doc.url}`)
      return {nodata: "no data"}
    }
  }))  
}).then(addArrays)
.then(muestraDatos)
.catch(function (error) {
  console.log(error);
});