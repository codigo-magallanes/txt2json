# Save data from txt file to JSON
## Use
 It fills an object with info about the Sun and the Moon extracted from text files.
 The object is defined as:
 ```
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
```
It contains the details of the sources where the data is obtained from.
## Data text files
The info has been copied from the websites and pasted to a plain text file.
## Future improvements
 - create independant modules for diferent data structures called only if the source is added to the _object_
## Notes
All help is well appreciated.