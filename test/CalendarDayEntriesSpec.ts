/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/CalendarDayEntries.ts"/>

module CalendarDay
{
	class CalendarDayEntriesMock extends CalendarDayEntries
	{
		callCounter : number = 0;

		init(year : number) : void
		{
			this.callCounter++;
			this.setDayEntry('20150604', { name: '04 ok', isFeastDay: false });
			this.setDayEntry('20150614', { name: '14 ok', isFeastDay: true });
		}
	}

	describe("Tests the storage of days", () => {
		it("for correct initialisation", () => {
			var calendarDayEntries : CalendarDayEntriesMock = new CalendarDayEntriesMock({});

			var result = calendarDayEntries.getDayEntry('20150604');
			expect(calendarDayEntries.callCounter).toBe(1);
			expect(result.name).toBe('04 ok');
			expect(result.isFeastDay).toBeFalsy();

			result = calendarDayEntries.getDayEntry('20150614');
			expect(calendarDayEntries.callCounter).toBe(1);
			expect(result.name).toBe('14 ok');
			expect(result.isFeastDay).toBeTruthy();

			var result = calendarDayEntries.getDayEntry('20150604');
			expect(calendarDayEntries.callCounter).toBe(1);
			expect(result.name).toBe('04 ok');
			expect(result.isFeastDay).toBeFalsy();

			var result = calendarDayEntries.getDayEntry('20160604');
			expect(calendarDayEntries.callCounter).toBe(2);
			expect(result.name).toBe('');
			expect(result.isFeastDay).toBeFalsy();
		});
	});
}
