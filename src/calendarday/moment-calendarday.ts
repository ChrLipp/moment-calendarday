/// <reference path="moment-dayinfo.d.ts" />

moment.initCalendarDays = function(config : CalendarDay.ConfigDays)
{
	this.CalendarDay_calendarDayEntries = new CalendarDay.CalendarDayEntries(config);
};

moment.nthWeekdayInMonth = function(
	weekCount : number, day : number,
	month : number, year: number)
{
	// if week is 0 (means last week in month), we have to add 1 month
	if (weekCount == 0) {
		month++;
		if (month > 11) {
			month = 0;
			year++;
		}
	}

	// start with the first of the given month
	var result = moment({
		date    : 1,
		month   : month,
		year    : year
	});

	// adjust the week day and the amount of weeks
	var delta = day - result.day();
	if (delta > -1) {
		weekCount--;
	}
	return result.add(delta + 7 * weekCount, 'days')
};

moment.nthWeekdayRelativeToDate = function(
	referenceDate : moment.Moment, weekCount : number, day : number)
{
	if (weekCount == 0) throw new Error("weekCount must not be 0!");

	// adjust to the given week day and the week
	var delta = day - referenceDate.day();
	if ((weekCount < 0) && (delta < 0)) {
		weekCount++;
	}
	else if ((weekCount > 0) && (delta > 0)) {
		weekCount--;
	}

	var result = moment(referenceDate);
	return result.add(delta + 7 * weekCount, 'days');
};

moment.fn.dayName = function()
{
	if (moment.CalendarDay_calendarDayEntries === undefined) {
		throw new Error(
			"You have to call moment.initCalendarDays() before accessing the calendar!");
	}

	var key = this.format('YYYYMMDD');
	var entry = moment.CalendarDay_calendarDayEntries.getDayEntry(key);
	return entry.name;
};

moment.fn.isFeastDay = function()
{
	if (moment.CalendarDay_calendarDayEntries === undefined) {
		throw new Error(
			"You have to call moment.initCalendarDays() before accessing the calendar!");
	}

	var key = this.format('YYYYMMDD');
	var entry = moment.CalendarDay_calendarDayEntries.getDayEntry(key);
	return entry.isFeastDay;
}
