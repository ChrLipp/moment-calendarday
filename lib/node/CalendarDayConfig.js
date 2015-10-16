var CalendarDay;
(function (CalendarDay) {
    /** Weedays Enumeration */
    (function (Weekday) {
        Weekday[Weekday["Monday"] = 1] = "Monday";
        Weekday[Weekday["Tuesday"] = 2] = "Tuesday";
        Weekday[Weekday["Wednesday"] = 3] = "Wednesday";
        Weekday[Weekday["Thursday"] = 4] = "Thursday";
        Weekday[Weekday["Friday"] = 5] = "Friday";
        Weekday[Weekday["Saturday"] = 6] = "Saturday";
        Weekday[Weekday["Sunday"] = 7] = "Sunday";
    })(CalendarDay.Weekday || (CalendarDay.Weekday = {}));
    var Weekday = CalendarDay.Weekday;
})(CalendarDay || (CalendarDay = {}));
