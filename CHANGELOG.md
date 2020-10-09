# txt2JSON

## v0.2.1

### Fixed
 - Only calls once to print data to screen.

### Changed

 - Now fetches all files and resolves them with a Promise.all

### Added

 - _node_ code (not updated) that saves a json file in '_./json/astroData.json_'

## v0.1.3

 ### Added

  + LICENSE
  + addNSCDates()

``` js
function addNSCDates(sunData) {
    let newYearsDate, year, d, obj = {}
    for (year in sunData) {
        obj = sunData[year]
        newYearsDate = setTimeToZero(obj[sunPhases[0]].gregDate)

        obj['newYearsDate'] = newYearsDate

        obj[sunPhases[0]]['day'] = setDayOfYear(obj[sunPhases[0]].gregDate, newYearsDate)
        obj[sunPhases[1]]['day'] = setDayOfYear(obj[sunPhases[1]].gregDate, newYearsDate)
        obj[sunPhases[2]]['day'] = setDayOfYear(obj[sunPhases[2]].gregDate, newYearsDate)
        obj[sunPhases[3]]['day'] = setDayOfYear(obj[sunPhases[3]].gregDate, newYearsDate)

        //newYearsDate = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate())
        console.log({
            year,
            newYearsDate,
            obj
        })
        sunData[year] = obj
    }
    return {
        sun: sunData
    }
}
```

 ### Changed

  + dataBase not added to output. Only data.

 ### Fixed

  + dates in _data.json_ now OK with UTC times.

## v0.1.2

 ### Fixed

  + Times referred to UTC again.

## v0.1.1

 ### Changed

  + Files structure all changed

 ### Added

  + Sources have their independent 'module'.

## v0.1.0

 - First version with basic data from sources
