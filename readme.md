[![MIT License][license-image]][license-url] 
[![Build Status][travis-image]][travis-url]
[![Code Coverage][codecov-image]][codecov-url]
[![NPM version][npm-image]][npm-url] 

Typescript Calendar class implemented as a moment.js plugin.
This is an alpha version - Do not use it until I release version 1.0.0   

## Open issues before V 1.0.0
- [x] make the code work in the browser
- [x] make the code work in node
- [x] Travis build
- [x] Project badges
- [x] Semantic versioning
- [ ] Code coverage (see https://github.com/gotwarlost/istanbul/issues/468)
- [ ] V 1.0.0

## What is it?
A Typescript Calendar class implemented as a [moment.js](https://www.npmjs.com/package/moment)
plugin which allows to config and access calendar day information.

I wanted to name the plugin `moment-calender`, a name which is already taken.
Therefor I had to change the name to `moment-calendarday`. This project is the successor of
the project [calendar-standalone](https://github.com/ChrLipp/calendar-standalone),
any further development will be done in this project. 

For an example I have implemented a
[year calendar](http://plnkr.co/edit/d4qXO2njPjWPVbvWM15O?p=info).

## Getting it
### In the browser
Just link to both `moment.js` and `moment-calendarday.js`:

```html
<script src="node_modules/moment/moment.js"></script>
<script src="node_modules/moment-calendarday/lib/web/moment-calendarday.js"></script>
```

### In node
Just require `moment-calendarday`:

```javascript
var moment = require('moment-calendarday');
```

## Configuration
A calendar day is described with the class CalenderDayEntry.
Currently it has just two properties, both taken from the configuration:

- name: the name of the day
- isFeastDay: a boolean property which defines if the day is a feast day

The initialisation of a calendar year is done with a JSON structure, defined in ConfigDays,
as follows:

```javascript
var config = { /* REST structure */ };
moment.initCalendarDays(config);
```

The advantage of the given implementation is that the config is year independent, so there is no
need to adapt the config every year. The main structure is:

```javascript
/** REST structure */
interface ConfigDays {
	configFixedDays?                    : ConfigFixedDay[];
	configEasterDependantDays?          : ConfigEasterDependantDay[];
	configNthWeekdayInMonthDays?        : ConfigNthWeekdayInMonthDay[];
	configNthWeekdayRelativeToDateDays? : ConfigNthWeekdayRelativeToDateDay[];
}
```

Fixed days are days which occure every year on the same date (like 24.12. when no year is given)
or even days at aspecific date (only 24.12.1015 and not the 24.12. on every year):

```javascript
interface ConfigFixedDay {
	day         : number;       // day
	month       : number;       // month
	year?       : number;       // year (when given, the entry defines a concrete date)
	name        : string;       // Name of the day
	isFeastDay  : boolean;      // Is the day a feast day?
}
```

Easter dependant days are days which are calculated relative to the Easter Sunday,
like the Easter Sunday itself or the Palm Sunday. 

```javascript
interface ConfigEasterDependantDay {
	delta       : number;       // Number of days relative to the Easter Sunday
	name        : string;       // Name of the day
	isFeastDay  : boolean;      // Is the day a feast day?
}
```

You can also define days occurring on the Nth Weekday of a month . This is needed e.g. for
Mothers and Fathers Day.

```javascript
interface ConfigNthWeekdayInMonthDay {
	weekCount   : number;       // count of the weekday (N)
	weekday     : Weekday;      // Weekday
	month       : number;       // month
	name        : string;       // Name of the day
	isFeastDay  : boolean;      // Is the day a feast day?
}
```

And finally you can define days occurring relative to a given date. This is needed e.g. for
the Advent sundays.
	
```javascript
interface ConfigNthWeekdayRelativeToDateDay {
	day         : number;       // reference date, day
	month       : number;       // reference date, month
	weekCount   : number;       // count of the weekday (N)
	weekday     : Weekday;      // Weekday
	name        : string;       // Name of the day
	isFeastDay  : boolean;      // Is the day a feast day?
}
```

A configuration which uses one entry of every option above looks like

```javascript
var config = {
	configFixedDays : [{
			"day"           : 1,
			"month"         : 1,
			"name"          : "New Year",
			"isFeastDay"    : true
		}],
	configEasterDependantDays : [{
			"delta"         : 0,
			"name"          : "Easter Sunday",
			"isFeastDay"    : true
		}],
	configNthWeekdayInMonthDays : [{
			"weekCount"     : 2,
			"weekday"       : 7,
			"month"         : 5,
			"name"          : "Mother's day",
			"isFeastDay"    : false
		}],
	configNthWeekdayRelativeToDateDays : [{
			"day"           : 25,
			"month"         : 12,
			"weekCount"     : -4,
			"weekday"       : 7,
			"name"          : "1. Advent",
			"isFeastDay"    : false
		}]
};
moment.initCalendarDays(config);
```

As you can see the configuration doesn't use the standard moment.js scheme (month from 0 to 11,
week start is Sunday with value 0, Monday=1, ...). Instead it uses the European format
(month from 1 to 12, week start is Monday with value 1, Sunday=7).
For other config examples have a look at the unit tests `test/*ConfigSpec.ts`

## Usage

With the example configuration above you can query the day information for any year's value:
 
```javascript
var result = moment().date(1).month(0).year(2015);
expect(result.dayName()).toBe("New Year");
expect(result.isFeastDay()).toBeTruthy();

result = moment().date(5).month(3).year(2015);
expect(result.dayName()).toBe("Easter Sunday");
expect(result.isFeastDay()).toBeTruthy();

result = moment().date(10).month(4).year(2015);
expect(result.dayName()).toBe("Mother's day");
expect(result.isFeastDay()).toBeTruthy();

result = moment().date(29).month(10).year(2015);
expect(result.dayName()).toBe("1. Advent");
expect(result.isFeastDay()).toBeFalsy();
```

## A word about internationalisation

Currently the config doesn't support internationalisation. However you can reinitialise with
a different language. This is also backed up with a unit test.

## Further development and contributing

Since I am not a full time JS developer, I have no plans to active support and develop
this library. The current functionality is given by the requirements of the project
I am currently in. 

I will follow the Angular commit guidelines from version 1.0.0 on, see
https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit


[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: LICENSE
[travis-url]: http://travis-ci.org/ChrLipp/moment-calendarday
[travis-image]: http://img.shields.io/travis/ChrLipp/moment-calendarday.svg
[npm-url]: https://www.npmjs.com/package/moment-calendarday
[npm-image]: https://img.shields.io/npm/v/moment-calendarday.svg
[codecov-url]: https://codecov.io/github/ChrLipp/moment-calendarday
[codecov-image]: https://img.shields.io/codecov/c/github/ChrLipp/moment-calendarday.svg
