/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/moment-calendarday.d.ts" />

module CalendarDay
{
	describe("Tests the calculation of nthWeekdayInMonth", () => {

		it("for the first Tuesday in September 2015", () => {
			var result = moment.nthWeekdayInMonth(1, 2, 8, 2015);
			expect(result.date()).toBe(1);
			expect(result.month() + 1).toBe(9);
			expect(result.year()).toBe(2015);
		});

		it("for the second Sunday in December 2015", () => {
			var result = moment.nthWeekdayInMonth(2, 0, 11, 2015);
			expect(result.date()).toBe(13);
			expect(result.month() + 1).toBe(12);
			expect(result.year()).toBe(2015);
		});

		it("for the last Sunday in September 2015", () => {
			var result = moment.nthWeekdayInMonth(0, 0, 8, 2015);
			expect(result.date()).toBe(27);
			expect(result.month() + 1).toBe(9);
			expect(result.year()).toBe(2015);
		});

		it("for the last Sunday in December 2015", () => {
			var result = moment.nthWeekdayInMonth(0, 0, 11, 2015);
			expect(result.date()).toBe(27);
			expect(result.month() + 1).toBe(12);
			expect(result.year()).toBe(2015);
		});
	});
}
