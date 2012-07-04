/*jshint smarttabs: true*/

/**
 * A date library providing useful date functions around a today date.
 *
 * @author Achilleas Tsoumitas (https://twitter.com/#!/knorcedger)
 * @version 1.1.0
 * @source https://github.com/Knorcedger/ODate.js
 *
 * @licence http://creativecommons.org/licenses/by/3.0/
 */

var ODate;

(function() {
	"use strict";

	/**
	 * The constructor that also defines some default values
	 */
	ODate = function() {};

	/**
	 * Set defaults
	 */
	ODate.prototype._dateObject = new Date();

	ODate.prototype.dateFormat = "dd/mm/yyyy";

	ODate.prototype.locale = "en";
	ODate.prototype.regional = {
		"en": {
			"dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			"dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			"monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			"monthNames": ["January", "February", "March", "April", "May", "June", "July", "AUgust", "September", "October", "November", "December"]
		}
	};

	/**
	 * Updates the todayDate object
	 * @param {Number} year
	 * @param {Number} month
	 * @param {Number} day
	 */
	ODate.prototype.setToday = function(year, month, day) {
		this._dateObject = new Date(year, month, day);
	};

	/**
	 * Adds years, months and days to today. Negative numbers can also be used
	 * @param {Number} years  The years to add. Must be integer
	 * @param {Number} months The months to add. Must be integer
	 * @param {NUmber} days   The days to add. Must be integer
	 */
	ODate.prototype.date = function(years, months, days) {
		var yearsToAdd = years && parseInt(years, 10) || 0;
		var monthsToAdd = months && parseInt(months, 10) || 0;
		var daysToAdd = days && parseInt(days, 10) || 0;

		return this._formatDate(new Date(this._dateObject.getFullYear() + yearsToAdd, this._dateObject.getMonth() + monthsToAdd, this._dateObject.getDate() + daysToAdd));
	};

	/**
	 * Returns the days that the asked month has
	 * @param  {Number} month
	 * @param  {Number} year
	 * @return {Number}
	 */
	ODate.prototype.daysInMonth = function(month, year) {
		return 32 - new Date(year, month - 1, 32).getDate();
	};

	/**
	 * Returns a formatted date given a date object and the desired format
	 * @param  {Date} date A date object
	 * @return {String}            The formatted date
	 */
	ODate.prototype._formatDate = function(date) {

		var expressions = {
			"dddd": this.regional[this.locale].dayNames[date.getDay()],
			"ddd": this.regional[this.locale].dayNamesShort[date.getDay()],
			"dd": this._addZero(date.getDate()),
			"d": date.getDate(),
			"mmmm": this.regional[this.locale].monthNames[date.getMonth()],
			"mmm": this.regional[this.locale].monthNamesShort[date.getMonth() + 1],
			"mm": this._addZero(date.getMonth() + 1),
			"m": date.getMonth() + 1,
			"yyyy": date.getFullYear(),
			"yy": date.getFullYear().toString().substring(2, 4)
		};

		//create the regular expression to replace the dateformat with actual data
		//add the first one and the for loop for the rest
		var regEx = new RegExp("(dddd)", "g");
		var i = 0;
		for (var property in expressions) {
			if (expressions.hasOwnProperty(property)) {
				if (i > 0) {
					var temp = new RegExp(property, "g");
					regEx = new RegExp(regEx.source + "|(" + temp.source + ")", "g");
				}
				i++;
			}
		}

		/**
		 * Replaces the expressions found
		 */

		function convert(str, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, offset, s) {
			if (p1) {
				return expressions.dddd;
			} else if (p2) {
				return expressions.ddd;
			} else if (p3) {
				return expressions.dd;
			} else if (p4) {
				return expressions.d;
			} else if (p5) {
				return expressions.mmmm;
			} else if (p6) {
				return expressions.mmm;
			} else if (p7) {
				return expressions.mm;
			} else if (p8) {
				return expressions.m;
			} else if (p9) {
				return expressions.yyyy;
			} else if (p10) {
				return expressions.yy;
			}
		}

		return this.dateFormat.replace(regEx, convert);
	};

	/**
	 * Add a leeding zeros to numbers smaller than 10
	 * @param  {String} value
	 * @return {String}
	 */
	ODate.prototype._addZero = function(value) {
		var result;
		if (value < 10) {
			result = "0" + value;
		} else {
			result = value;
		}

		return result;
	};
}());
