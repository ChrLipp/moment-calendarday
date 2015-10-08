/// <reference path="../typings/jasmine/jasmine.d.ts" />

module CalendarDay
{
	describe("Tests the configuration of easter dependant feast days", () => {
		var config = {
			configEasterDependantDays : [{
					"delta"         : -47,
					"name"          : "Faschingsdienstag",
					"isFeastDay"    : false
				}, {
					"delta"         : 0,
					"name"          : "Ostersonntag",
					"isFeastDay"    : true
				}, {
					"delta"         : 1,
					"name"          : "Ostermontag",
					"isFeastDay"    : true
				}, {
					"delta"         : 39,
					"name"          : "Christi Himmelfahrt",
					"isFeastDay"    : true
				}]
		};

		var calendarDayEntries : CalendarDayEntries;

		beforeAll(() => {
			calendarDayEntries = new CalendarDayEntries(config);
		});

		it("for a minus delta", () => {
			var entry = calendarDayEntries.getDayEntry('20150217');
			expect(entry.name).toBe('Faschingsdienstag');
			expect(entry.isFeastDay).toBeFalsy();
		});

		it("for no delta", () => {
			var entry = calendarDayEntries.getDayEntry('20150405');
			expect(entry.name).toBe('Ostersonntag');
			expect(entry.isFeastDay).toBeTruthy();
		});

		it("for a +1 delta", () => {
			var entry = calendarDayEntries.getDayEntry('20150406');
			expect(entry.name).toBe('Ostermontag');
			expect(entry.isFeastDay).toBeTruthy();
		});

		it("for a positive delta", () => {
			var entry = calendarDayEntries.getDayEntry('20150514');
			expect(entry.name).toBe('Christi Himmelfahrt');
			expect(entry.isFeastDay).toBeTruthy();
		});
	});
}
