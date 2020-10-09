# Save data from txt file to JSON
## Use
 It fills an object with info about the Sun and the Moon extracted from text files.
 The sources to create the object are defined in _js/dataBase.js_ like:
 ```js
 export default {
  "sources": {
    "astropixels": {
      "url": "http://astropixels.com/",
      "files": [
        "/sources/astropixels/sun_2001-2050(equinox-solstice)(astropixels).txt",
        "/sources/astropixels/sun_2051-2100(equinox-solstice)(astropixels).txt"
      ]
    },
    "calendario365": {
      "url": "https://www.calendario-365.es/luna/lunar-fases.html",
      "files": [
        "/sources/calendario365/moon_2020(calendario365).txt",
        "/sources/calendario365/moon_2021(calendario365).txt"
      ]
    },
    "newSource": {
      "url": "http:///example.com",
      "files": [
        "/sources/newsource/example.txt"
      ]
    }
  }
}
```
It contains the details of the sources where the data is obtained from.
The code adds new properties with data of the _Sun_ and of the _Moon_
## Data text files
The info has been copied from the websites and pasted to a plain text file.
## Notes
All help is well appreciated.