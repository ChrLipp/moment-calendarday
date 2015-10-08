# moment-dayinfo ReadMe - This is version 0.0.1 - Do not use it until I release 1.0.0

## What is it?
A Typescript Calendar class implemented as a [moment.js](http://momentjs.com/) plugin
which allows to config and access calendar day information. Both
[Repository](https://github.com/ChrLipp/moment-calendarday) and
[Issues](https://github.com/ChrLipp/moment-calendarday/issues) are on Github.

I wanted to name the plugin `moment-calender`, a name which is already taken.
Therefor I had to change the name to `moment-calendarday`. This project is the successor of
the project [calendar-standalone](https://github.com/ChrLipp/calendar-standalone).
Any further development will be done in this project. 


## Configuration
A calendar day is described with the class CalenderDayEntry.
Currently it has just two properties:

- name, the name of the day
- isFeastDay, a boolean property which defines if the day is a feast day

The initialisation of a calendar year is done with a JSON structure, defined in ConfigDays.
The advantage of the given implementation is that the config is year independent, so there is no
need to adapt the config every year.

For some config examples have a look at the unit tests `src/test/*ConfigSpec.ts

## Usage


