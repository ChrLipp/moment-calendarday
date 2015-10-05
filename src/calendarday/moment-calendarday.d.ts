/// <reference path="../typings/moment/moment.d.ts" />
/// <reference path="CalendarDayConfig.ts" />

// Extensions for moment.MomentStatic
declare module moment
{
	interface MomentStatic
	{
		/** Calendar day storage. */
		CalendarDay_calendarDayEntries : CalendarDay.CalendarDayEntries;

		/**
		 * Add the calendar storage to MomentStatic and initialises it.
		 * For a detailed description, see CalendarDay.CalendarDayEntries.init().
		 */
		initCalendarDays(config : CalendarDay.ConfigDays) : void;

		/**
		 * Calculates a date constructed by the week number, the week day and the month.
		 * Day can be 1 to 4 (the first day, the forth day) or 0 (which means the last day).
		 * The function uses the moment.js range of values, which means day in Moment.js format
		 * (0 = Sunday, 1 = Monday, ...) and 0 based month.
		 * For example, the first Wednesday in September 2015 ic calculated with
		 * calcDateByWDMY(1, Weekday.Wednesday, 8, 2015)
		 * and the last Sunday in September 2015 is calculated with
		 * calcDateByWDMY(0, Weekday.Sunday, 8, 2015)
		 * @param weekCount Number of the week
		 * @param day       Day in Moment.js format (0 = Sunday, 1 = Monday, ..)
		 * @param month     Month in moment.js format (0 = January, ..., 11 = December)
		 * @param year      Year
		 */
		nthWeekdayInMonth(weekCount : number, day : number, month : number, year: number) : Moment;

		/**
		 * Calculates a date relative to a given reference date. The result date is specified
		 * by the weekday and the amount of weeks between reference date and result date.
		 * The function uses the moment.js range of values, which means day in Moment.js format
		 * (0 = Sunday, 1 = Monday, ...).
		 * E.g. calculate the first sunday before December, 25th will calculate the
		 * 4th Advent with the following call:
		 *      var refDate = moment({date: 25, month: 11, year: 215});
		 *      nthWeekdayRelativeToDate(refDate, -1, 0);
		 * @param referenceDate Reference date
		 * @param weekCount     Number of the week
		 * @param day           Day in Moment.js format (0 = Sunday, 1 = Monday, ..)
		 */
		nthWeekdayRelativeToDate(referenceDate : Moment, weekCount : number, day : number) : Moment;
	}
}

// Extensons for moment.Moment
declare module moment
{
	interface Moment
	{
		/** Retrieves the day name from the calendar structure. */
		dayName() : string;

		/** Retrieves the feast day flag from the calendar structure. */
		isFeastDay() : boolean;
	}
}
