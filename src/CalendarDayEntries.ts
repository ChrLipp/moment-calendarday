/// <reference path="CalendarDayConfig.ts" />
/// <reference path="../lib/moment-calendarday.d.ts" />

module CalendarDay
{
    /**
     * Calendar day storage, which allows to give special calendar days properties (defined in
     * CalenderDayEntry). The rule set for the initialisation is defined in a way that you don't
     * have to update it every year (see ConfigFeastDays and the substructures).
     */
    export class CalendarDayEntries
    {
        /** Map of calculated feast days. Key is 'YYYYMMDD', value is CalenderDayEntry. */
        private calendar : Object = {};

	    /** Marker for initialised years */
	    private yearMarker : Object = {};

	    /**
	     * Ctor.
	     * @param config config data for year initialisation
	     */
	    constructor(public config : ConfigDays)
	    {}

	    /**
	     * Helper function to calculate the key for accessing the calendar storage.
	     * @param day       day
	     * @param month     month
	     * @param year      year
	     * @returns {string} encoded in the form 'YYYYMMDD'
	     */
	    private static buildKey(day : number, month : number, year : number) : string
	    {
		    var pad = function (n) {
			    return ("00" + n).slice(-2);
		    };
		    return year + pad(month) + pad(day);
	    }

	    /**
	     * Function to calculate the Easter Sunday (Sunday following the full moon that follows the
	     * northern spring equinox). Christian holy days are mostly movable feasts relative to the
	     * Easter Sunday. The calculation applies the "Meeus/Jones/Butcher" algorithm, see e.g.
	     * https://de.wikibooks.org/wiki/Astronomische_Berechnungen_f%C3%BCr_Amateure/
	     * _Kalender/_Berechnungen#Osterdatum
	     * @param year The year for the Easter Sunday calculation (must > then 1582)
	     * @returns {any} Date of the Easter Sunday in the given year
	     */
	    private static calcEasterSunday(year : number) : moment.Moment
	    {
		    var a = year % 19;

		    var b = Math.floor(year / 100);
		    var c = year % 100;

		    var d = Math.floor(b / 4);
		    var e = b % 4;

		    var f = Math.floor((b + 8) / 25);
		    var g = Math.floor((b - f + 1) / 3);
		    var h = (19 * a + b - d - g + 15) % 30;

		    var i = Math.floor(c / 4);
		    var k = c % 4;

		    var m = (32 + 2 * e + 2 * i - h - k) % 7;
		    var n = Math.floor((a + 11 * h + 22 * m) / 451);
		    var p = h + m - 7 * n + 114;

		    return moment({
			    date    : p % 31 + 1,
			    month   : Math.floor(p / 31) - 1,
			    year    : year
		    });
	    }

	    /**
	     * Init the calendar with easter dependant feast days.
	     * @param year      Year to init
	     * @param config    Configuration to apply
	     */
	    private initEasterDependantFeastDays(
		    year    : number,
		    config  : ConfigEasterDependantDay[]) : void
	    {
		    var easterSunday = CalendarDayEntries.calcEasterSunday(year);

		    for (var i = 0; i < config.length; ++i)
		    {
			    // calculate day
			    var currentEntry = config[i];

			    var result = easterSunday.clone();
			    result.add(currentEntry.delta, 'days');

			    // save name in calendar structure
			    this.setDayEntry(
				    result.format('YYYYMMDD'),
				    {
					    name        : currentEntry.name,
					    isFeastDay  : currentEntry.isFeastDay
				    });
		    }
	    }

	    /**
	     * Init the calendar with fixed feast days.
	     * @param year      Year to init
	     * @param config    Configuration to apply
	     */
	    private initFixedFeastdays(
		    year    : number,
		    config  : ConfigFixedDay[]) : void
	    {
		    for (var i = 0; i < config.length; ++i)
		    {
			    var currentEntry = config[i];

			    if ((currentEntry.year && currentEntry.year == year) ||
				    (currentEntry.year == undefined))
			    {
				    this.setDayEntry(
					    CalendarDayEntries.buildKey(
						    currentEntry.day,
						    currentEntry.month, year),
					    {
						    name        : currentEntry.name,
						    isFeastDay  : currentEntry.isFeastDay
					    });
			    }
		    }
	    }

		/**
	     * Init the calendar with Nth week day in month feast days.
	     * @param year      Year to init
	     * @param config    Configuration to apply
	     */
	    private initNthWeekdayInMonthFeastday(
		    year    : number,
		    config  : ConfigNthWeekdayInMonthDay[]) : void
	    {
		    for (var i = 0; i < config.length; ++i)
		    {
			    // get entry and convert value range
			    var currentEntry = config[i];
			    var weekday = currentEntry.weekday;
			    if (currentEntry.weekday == Weekday.Sunday) {
				    weekday = weekday - 7;
			    }

			    // calculate day
			    var result = moment.nthWeekdayInMonth(
				    currentEntry.weekCount, weekday, currentEntry.month - 1, year);

			    // save name in calendar structure
			    this.setDayEntry(
				    result.format('YYYYMMDD'),
				    {
					    name        : currentEntry.name,
					    isFeastDay  : currentEntry.isFeastDay
				    });
		    }
	    }

	    /**
	     * Init the calendar with Nth week day relative to a given date.
	     * @param year      Year to init
	     * @param config    Configuration to apply
	     */
	    private initNthWeekdayRelativeToDate(
		    year    : number,
		    config  : ConfigNthWeekdayRelativeToDateDay[]) : void
	    {
		    for (var i = 0; i < config.length; ++i)
		    {
			    // get entry and convert value range
			    var currentEntry = config[i];
			    var weekday = currentEntry.weekday;
			    if (currentEntry.weekday == Weekday.Sunday) {
				    weekday = weekday - 7;
			    }

			    // calculate day
			    var reference = moment({
				    date    : currentEntry.day,
				    month   : currentEntry.month - 1,
				    year    : year});

			    var result =  moment.nthWeekdayRelativeToDate(
				    reference, currentEntry.weekCount, weekday);

			    // save name in calendar structure
			    this.setDayEntry(
				    result.format('YYYYMMDD'),
				    {
					    name        : currentEntry.name,
					    isFeastDay  : currentEntry.isFeastDay
				    });
		    }
	    }

	    /**
	     * Init the calendar.
	     * @param year      Year to init
	     * @param config    Configuration to apply
	     */
	    init(year : number, config : ConfigDays) : void
	    {
		    // assert parameter
		    if (year < 1971) throw new Error("Year before 1971 is not supported: " + year);

		    // reset current data
		    this.calendar = {};
		    this.yearMarker = {};

		    // init sections
		    if (config.configFixedDays) {
			    this.initFixedFeastdays(
				    year, config.configFixedDays);
		    }
		    if (config.configEasterDependantDays) {
			    this.initEasterDependantFeastDays(
				    year, config.configEasterDependantDays);
		    }
		    if (config.configNthWeekdayInMonthDays) {
			    this.initNthWeekdayInMonthFeastday(
				    year, config.configNthWeekdayInMonthDays);
		    }
		    if (config.configNthWeekdayRelativeToDateDays) {
			    this.initNthWeekdayRelativeToDate(
				    year, config.configNthWeekdayRelativeToDateDays);
		    }
	    }

	    /**
	     * Sets the entry for a given day.
	     * @param key   given day in the format YYYYMMDD, e.g. 20150614
	     * @param entry entry for the given day
	     */
	    setDayEntry(key : string, entry : CalenderDayEntry) : void
	    {
		    // argument check
		    if (key.length != 8) throw new Error("Invalid key format: " + key);

		    // set entry
		    this.calendar[key] = entry;
	    }

	    /**
	     * Retrieves the entry for a given day.
	     * @param key   given day in the format YYYYMMDD, e.g. 20150614
	     * @returns {CalenderDayEntry} entry for the given day
	     */
	    getDayEntry(key : string) : CalenderDayEntry
	    {
		    // argument check
		    if (key.length != 8) throw new Error("Invalid key format: " + key);

		    // check for necessary initialisation
		    var year = key.substring(0, 4);
		    if (this.yearMarker[year] === undefined) {
				this.yearMarker[year] = true;
			    this.init(+year, this.config);
		    }

		    // retrieve value and provide a default value
		    var result = this.calendar[key];
		    if (result == undefined) {
			    result = {
					name: '',
				    isFeastDay: false
			    };
		    }

		    return result;
		}
    }
}