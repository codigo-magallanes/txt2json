# Save data from txt file to JSON
## Use
 It fills an object with info about the Sun and the Moon extracted from text files.
 The object is defined in a module like:
 ```
 export default {
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
};
```
It contains the details of the sources where the data is obtained from.
The code adds new properties with data of the _Sun_ and of the _Moon_
## Data text files
The info has been copied from the websites and pasted to a plain text file.
## Notes
All help is well appreciated.
## Future improvements
 - Avoid loading the data everytime a source is analyzed