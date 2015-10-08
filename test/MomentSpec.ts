/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../lib/moment-calendarday.d.ts" />

module CalendarDay
{
	describe("Moment integration", () => {
		beforeEach(() => {
			// undo the initialisation
			moment.CalendarDay_calendarDayEntries = undefined;
		});

		it("without initialisation", () => {
			var result = moment().date(1).month(0).year(2015);

			expect(() => { result.dayName() }).toThrow(Error(
				"You have to call moment.initCalendarDays() before accessing the calendar!"));
			expect(() => { result.isFeastDay() }).toThrow(Error(
				"You have to call moment.initCalendarDays() before accessing the calendar!"));
		});

		it("with empty config", () => {
			moment.initCalendarDays({});
			var result = moment().date(1).month(0).year(2015);

			expect(result.dayName()).toBe('');
		});

		it("with one config", () => {
			var config = {
				configFixedDays : [
					{
						"day"           : 1,
						"month"         : 1,
						"name"          : "Neujahr",
						"isFeastDay"    : true
					}]
			};

			var result = moment().date(1).month(0).year(2015);
			moment.initCalendarDays(config);
			expect(result.dayName()).toBe('Neujahr');
			expect(result.isFeastDay()).toBeTruthy();
		});

		it("with two configs", () => {
			var config1 = {
				configFixedDays : [
					{
						"day"           : 1,
						"month"         : 1,
						"name"          : "Neujahr",
						"isFeastDay"    : true
					}]
			};
			var config2 = {
				configFixedDays : [
					{
						"day"           : 1,
						"month"         : 5,
						"name"          : "Staatsfeiertag",
						"isFeastDay"    : true
					}]
			};

			var date1 = moment().date(1).month(0).year(2015);
			var date2 = moment().date(1).month(4).year(2015);

			moment.initCalendarDays(config1);
			expect(date1.dayName()).toBe('Neujahr');
			expect(date1.isFeastDay()).toBeTruthy();
			expect(date2.dayName()).toBe('');
			expect(date2.isFeastDay()).toBeFalsy();

			moment.initCalendarDays(config2);
			expect(date1.dayName()).toBe('');
			expect(date1.isFeastDay()).toBeFalsy();
			expect(date2.dayName()).toBe('Staatsfeiertag');
			expect(date2.isFeastDay()).toBeTruthy();
		});
	});
}
