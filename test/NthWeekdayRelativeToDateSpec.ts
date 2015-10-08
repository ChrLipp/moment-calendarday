/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../lib/moment-calendarday.d.ts" />

module CalendarDay
{
	describe("Tests the calculation of nthWeekdayRelativeToDate", () => {

		it("week before, week day before", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});
			var result = moment.nthWeekdayRelativeToDate(reference, -1, 2);

			expect(result.date()).toBe(6);
			expect(result.month() + 1).toBe(10);
			expect(result.year()).toBe(2015);
			expect(reference.format('YYYYMMDD')).toBe('20151007');
		});

		it("week before, week day after", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});
			var result = moment.nthWeekdayRelativeToDate(reference, -1, 4);

			expect(result.date()).toBe(1);
			expect(result.month() + 1).toBe(10);
			expect(result.year()).toBe(2015);
			expect(reference.format('YYYYMMDD')).toBe('20151007');
		});

		it("week before, same week day", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});
			var result = moment.nthWeekdayRelativeToDate(reference, -1, 3);

			expect(result.date()).toBe(30);
			expect(result.month() + 1).toBe(9);
			expect(result.year()).toBe(2015);
			expect(reference.format('YYYYMMDD')).toBe('20151007');
		});

		it("next week, week day before", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});
			var result = moment.nthWeekdayRelativeToDate(reference, 1, 2);

			expect(result.date()).toBe(13);
			expect(result.month() + 1).toBe(10);
			expect(result.year()).toBe(2015);
			expect(reference.format('YYYYMMDD')).toBe('20151007');
		});

		it("next week, week day after", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});
			var result = moment.nthWeekdayRelativeToDate(reference, 1, 4);

			expect(result.date()).toBe(8);
			expect(result.month() + 1).toBe(10);
			expect(result.year()).toBe(2015);
			expect(reference.format('YYYYMMDD')).toBe('20151007');
		});

		it("next week, same week day", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});
			var result = moment.nthWeekdayRelativeToDate(reference, 1, 3);

			expect(result.date()).toBe(14);
			expect(result.month() + 1).toBe(10);
			expect(result.year()).toBe(2015);
			expect(reference.format('YYYYMMDD')).toBe('20151007');
		});

		it("for invalid parameters", () => {
			var reference = moment({ date: 7, month: 9, year: 2015});

			expect(() => { moment.nthWeekdayRelativeToDate(reference, 0, 0) }).toThrow(Error(
				"weekCount must not be 0!"));
		});
	});
}
