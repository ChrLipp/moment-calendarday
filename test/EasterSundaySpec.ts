/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />

module CalendarDay
{
	describe("Tests the calculation of the easter sunday for", () => {

		it("the given year 1981", () => {
			var result : moment.Moment = CalendarDayEntries["calcEasterSunday"](1981);
			expect(result.date()).toBe(19);
			expect(result.month() + 1).toBe(4);
			expect(result.format('DDMMYYYY')).toBe('19041981');
		});

		it("the given year 2015", () => {
			var result = CalendarDayEntries["calcEasterSunday"](2015);
			expect(result.date()).toBe(5);
			expect(result.month() + 1).toBe(4);
			expect(result.format('DDMMYYYY')).toBe('05042015');
		});

		it("the given year 2016", () => {
			var result = CalendarDayEntries["calcEasterSunday"](2016);
			expect(result.date()).toBe(27);
			expect(result.month() + 1).toBe(3);
			expect(result.format('DDMMYYYY')).toBe('27032016');
		});

		it("the given year 2017", () => {
			var result = CalendarDayEntries["calcEasterSunday"](2017);
			expect(result.date()).toBe(16);
			expect(result.month() + 1).toBe(4);
			expect(result.format('DDMMYYYY')).toBe('16042017');
		});

		it("the given year 2018", () => {
			var result = CalendarDayEntries["calcEasterSunday"](2018);
			expect(result.date()).toBe(1);
			expect(result.month() + 1).toBe(4);
			expect(result.format('DDMMYYYY')).toBe('01042018');
		});
	});
}
