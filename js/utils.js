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

export function addArrays(arr) {
    arr.forEach(x => {
      for (let astro in x) {
        astroData[astro] = { ...astroData[astro],  ...x[astro] }
      }
    })
    console.log({astroData})
    return astroData;
  }

export function showData(data) {
    const elData = document.querySelector("#data");
    elData.innerHTML = JSON.stringify(data, null, 2);
    console.log(data);
    return data
  }

 export const muestraDatos = (data) => {
     console.log({muestraDatos: data})
    const el = document.createElement('pre')
    el.innerHTML = JSON.stringify(data, null, 2)
    document.querySelector('#container').appendChild(el)
    return data
}

const aplicarAsync = (acc,val) => acc.then(val);

export const componerAsync = (...funcs) => x => funcs.reduce(aplicarAsync, Promise.resolve(x));