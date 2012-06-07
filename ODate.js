/*jshint smarttabs: true*/

/**
 * A date library providing useful date functions around a today date.
 *
 * @author Achilleas Tsoumitas (https://twitter.com/#!/knorcedger)
 * @version 1.0.0
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
			"D": this.regional[this.locale].dayNames[date.getDay()],
			"l": this.regional[this.locale].dayNamesShort[date.getDay()],
			"d": this._addZero(date.getDate()),
			"j": date.getDate(),
			"F": this.regional[this.locale].monthNames[date.getMonth()],
			"M": this.regional[this.locale].monthNamesShort[date.getMonth() + 1],
			"m": this._addZero(date.getMonth() + 1),
			"n": date.getMonth() + 1,
			"Y": date.getFullYear(),
			"y": date.getFullYear().toString().substring(2, 4)
		};

		var result = this.dateFormat;
		var format = this.dateFormat;

		for (var property in expressions) {
			if (expressions.hasOwnProperty(property)) {
				var regEx = new RegExp(property + "[\b]?", "g");
				if (regEx.test(format)) {
					result = result.replace(property, expressions[property]);
					format = format.replace(property, "");
				}
			}
		}

		return result;
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