// utils.js

// Splits a document into an array of files
export function getTextLines(data) {
    return data.split("\n");
  }
  
 export function addData(obj) {
    console.log({
      obj
    });
    astroData = {
      ...astroData,
      ...obj
    };
    return astroData;
  }
  
let astroData = {
    sun: {},
    moon: {}
};

// Takes an array with all de documents formated as elements
// Each document is an object with one father element and inside of it is all the data
// This function populates the object 'astroData' with the documents of the array and groups them according to their source
export function addArrays(arr) {
    arr.forEach(x => {
      for (let astro in x) {
        astroData[astro] = { ...astroData[astro],  ...x[astro] }
      }
    })
    return astroData;
  }

export function showData(data) {
    const elData = document.querySelector("#data");
    elData.innerHTML = JSON.stringify(data, null, 2);
    console.log(data);
    return data
  }

// Takes the final data and prints it in the html
// Creates a new element 'el' => <pre>, and writes the data in it
export const muestraDatos = (data) => {
    const el = document.createElement('pre')
    el.innerHTML = JSON.stringify(data, null, 2)
    document.querySelector('#container').appendChild(el)
    return data
}


// componerAsync is a function that executes an array of functions that are passed as parameters
// Here we only create the function and is populated with the functions to execute when is called
const aplicarAsync = (acc,val) => acc.then(val);
export const componerAsync = (...funcs) => x => funcs.reduce(aplicarAsync, Promise.resolve(x));