[![MIT License][license-image]][license-url] 

Typescript Calendar class implemented as a moment.js plugin.
This is a alpha version - Do not use it until I release version 1.0.0   

## Open issues before V 1.0.0
- [x] make the code work in the browser
- [x] make the code work in node
- [ ] Code coverage
- [ ] Travis build
- [ ] Project badges
- [ ] Semantic versioning
- [ ] V 1.0.0

## What is it?
A Typescript Calendar class implemented as a [moment.js](https://www.npmjs.com/package/moment)
plugin which allows to config and access calendar day information.

I wanted to name the plugin `moment-calender`, a name which is already taken.
Therefor I had to change the name to `moment-calendarday`. This project is the successor of
the project [calendar-standalone](https://github.com/ChrLipp/calendar-standalone).
Any further development will be done in this project. 

## Getting it
### In the browser
Just link to both `moment.js` and `moment-calendarday.js`:

```html
<script src="node_modules/moment/moment.js"></script>
<script src="node_modules/moment-calendarday/lib/web/moment-calendarday.js"></script>
```

### In node
Just `require` `moment-calendarday`:

```javascript
var moment = require('moment-calendarday');
```

## Configuration
A calendar day is described with the class CalenderDayEntry.
Currently it has just two properties:

- name, the name of the day
- isFeastDay, a boolean property which defines if the day is a feast day

The initialisation of a calendar year is done with a JSON structure, defined in ConfigDays,
as follows:

```javascript
var config = { /* REST structure */ };
moment.initCalendarDays(config);
```

The advantage of the given implementation is that the config is year independent, so there is no
need to adapt the config every year. The main structure is:

```javascript
/** root structure */
export interface ConfigDays {
	configFixedDays?                    : ConfigFixedDay[];
	configEasterDependantDays?          : ConfigEasterDependantDay[];
	configNthWeekdayInMonthDays?        : ConfigNthWeekdayInMonthDay[];
	configNthWeekdayRelativeToDateDays? : ConfigNthWeekdayRelativeToDateDay[];
}
```

Fixed days are days which occure every year on the same date (like 24.12. when no year is given)
or even days at aspecific date (only 24.12.1015 and not the 24.12. on every year):

```javascript
export interface ConfigFixedDay {
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
export interface ConfigEasterDependantDay {
	delta       : number;       // Number of days relative to the Easter Sunday
	name        : string;       // Name of the day
	isFeastDay  : boolean;      // Is the day a feast day?
}
```

You can also define days occurring on the Nth Weekday of a month . This is needed e.g. for
Mothers and Fathers Day.

```javascript
export interface ConfigNthWeekdayInMonthDay {
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
export interface ConfigNthWeekdayRelativeToDateDay {
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

With the example configuration above you will get for any year's value:
 
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

[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: LICENSE
