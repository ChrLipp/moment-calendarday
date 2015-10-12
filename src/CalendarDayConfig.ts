module CalendarDay
{
	/** Weedays Enumeration */
	export enum Weekday {
		Monday = 1,
		Tuesday,
		Wednesday,
		Thursday,
		Friday,
		Saturday,
		Sunday
	}

	/** Configuration data for a single Eastern dependant named day. */
	export interface ConfigEasterDependantDay {
		delta       : number;       // Number of days relative to the Easter Sunday
		name        : string;       // Name of the day
		isFeastDay  : boolean;      // Is the day a feast day?
	}

	/**
	 * Configuration data for a named day
	 * - occurring every year on the same date (24.12.)
	 *   when the year property is not provided or
	 * - a specific date (only 24.12.1015 and not the 24.12. on every year)
	 */
	export interface ConfigFixedDay {
		day         : number;       // day
		month       : number;       // month
		year?       : number;       // year (when given, the entry defines a concrete date)
		name        : string;       // Name of the day
		isFeastDay  : boolean;      // Is the day a feast day?
	}

	/** Configuration data for a named day occurring on the Nth Weekday of a month */
	export interface ConfigNthWeekdayInMonthDay {
		weekCount   : number;       // count of the weekday (N)
		weekday     : Weekday;      // Weekday
		month       : number;       // month
		name        : string;       // Name of the day
		isFeastDay  : boolean;      // Is the day a feast day?
	}

	/** Configuration data for a named day occurring relative to a given date (n weeks) */
	export interface ConfigNthWeekdayRelativeToDateDay {
		day         : number;       // reference date, day
		month       : number;       // reference date, month
		weekCount   : number;       // count of the weekday (N)
		weekday     : Weekday;      // Weekday
		name        : string;       // Name of the day
		isFeastDay  : boolean;      // Is the day a feast day?
	}

	/** root structure */
	export interface ConfigDays {
		configFixedDays?                    : ConfigFixedDay[];
		configEasterDependantDays?          : ConfigEasterDependantDay[];
		configNthWeekdayInMonthDays?        : ConfigNthWeekdayInMonthDay[];
		configNthWeekdayRelativeToDateDays? : ConfigNthWeekdayRelativeToDateDay[];
	}
}

