/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../src/CalendarDayEntries.ts"/>

module CalendarDay
{
    describe("Tests the configuration of fixed days", () => {
        var config = {
            configFixedDays : [{
                    "day"           : 1,
                    "month"         : 1,
                    "name"          : "Neujahr",
                    "isFeastDay"    : true
                }, {
                    "day"           : 6,
                    "month"         : 1,
                    "name"          : "Heilige Drei Könige",
                    "isFeastDay"    : true
                }, {
                    "day"           : 1,
                    "month"         : 5,
                    "name"          : "Staatsfeiertag",
                    "isFeastDay"    : true
                }, {
                    "day"           : 14,
                    "month"         : 6,
                    "year"          : 2015,
                    "name"          : "Entry with year",
                    "isFeastDay"    : false
                }]
        };

        var calendarDayEntries : CalendarDayEntries;

        beforeAll(() => {
            calendarDayEntries = new CalendarDayEntries(config);
        });

        it("for New Years Eve", () => {
            var entry = calendarDayEntries.getDayEntry('20150101');
            expect(entry.name).toBe('Neujahr');
            expect(entry.isFeastDay).toBeTruthy();
        });

        it("for Three Kings", () => {
            var entry = calendarDayEntries.getDayEntry('20150106');
            expect(entry.name).toBe('Heilige Drei Könige');
            expect(entry.isFeastDay).toBeTruthy();
        });

        it("National Day", () => {
            var entry = calendarDayEntries.getDayEntry('20150501');
            expect(entry.name).toBe('Staatsfeiertag');
            expect(entry.isFeastDay).toBeTruthy();
        });

        it("Entry with year - positive test", () => {
            var entry = calendarDayEntries.getDayEntry('20150614');
            expect(entry.name).toBe('Entry with year');
            expect(entry.isFeastDay).toBeFalsy();
        });

        it("Entry with year - negative test", () => {
            var entry = calendarDayEntries.getDayEntry('20160614');
            expect(entry.name).toBe('');
            expect(entry.isFeastDay).toBeFalsy();
        });
    });
}
