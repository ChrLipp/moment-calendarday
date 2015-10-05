/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../calendarday/moment-calendarday.d.ts" />

module CalendarDay
{
	describe("Tests the configuration of week days relative to a date", () => {
		var config = {
			configNthWeekdayRelativeToDateDays : [
				{
					"day"           : 25,
					"month"         : 12,
					"weekCount"     : -4,
					"weekday"       : 7,
					"name"          : "1. Advent",
					"isFeastDay"    : false
				}, {
					"day"           : 25,
					"month"         : 12,
					"weekCount"     : -1,
					"weekday"       : 7,
					"name"          : "4. Advent",
					"isFeastDay"    : false
				}, {
					"day"           : 25,
					"month"         : 12,
					"weekCount"     : 1,
					"weekday"       : 7,
					"name"          : "Sunday after Christmas Eve",
					"isFeastDay"    : false
				}]
		};

		var calendarDayEntries : CalendarDayEntries;

		beforeAll(() => {
			calendarDayEntries = new CalendarDayEntries(config);
		});

		it("for first Sunday in Advent", () => {
			var entry = calendarDayEntries.getDayEntry('20151129');
			expect(entry.name).toBe('1. Advent');
			expect(entry.isFeastDay).toBeFalsy();
		});

		it("for forth Sunday in Advent", () => {
			var entry = calendarDayEntries.getDayEntry('20151220');
			expect(entry.name).toBe('4. Advent');
			expect(entry.isFeastDay).toBeFalsy();
		});

		it("for Sunday after Christmas Eve", () => {
			var entry = calendarDayEntries.getDayEntry('20151227');
			expect(entry.name).toBe('Sunday after Christmas Eve');
			expect(entry.isFeastDay).toBeFalsy();
		});
	});
}
