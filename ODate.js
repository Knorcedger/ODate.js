/*jshint smarttabs: true*/

var ODate;

(function() {
	"use strict";

	/**
	 * An object that provides usefull functions with dates
	 */
	ODate = function() {
		// set defaults
		this._todayObject = new Date();
		this._dateObject = new Date();

		this.dateFormat = "dd/mm/yyyy";

		this.locale = "en";
		this.regional = {};
		this.regional.en = {};
		this.regional.en.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		this.regional.en.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		//this.regional.en.dayNamesMin = ["Su","Mo","Tu","We","Th","Fr","Sa"];
		this.regional.en.monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		this.regional.en.monthNames = ["January", "February", "March", "April", "May", "June", "July", "AUgust", "September", "October", "November", "December"];
	};

	/**
	 * Updates the todayDate object
	 * @param {Number} year
	 * @param {Number} month
	 * @param {Number} day
	 */
	ODate.prototype.setToday = function(year, month, day) {
		this._todayObject = new Date(year, month, day);
	};

	/**
	 * Adds years, months and days to today. Negative numbers can also be used
	 * @param {Number} years  The years to add. Must be integer
	 * @param {Number} months The months to add. Must be integer
	 * @param {NUmber} days   The days to add. Must be integer
	 */
	ODate.prototype.date = function(years, months, days) {
		this._dateObject = new Date(this._todayObject.getFullYear() + parseInt(years, 10), this._todayObject.getMonth() + parseInt(months, 10), this._todayObject.getDate() + parseInt(days, 10));

		return this;
	};

	/**
	 * Returns the date as a string formatted based on date format setting
	 * @return {String}
	 */
	ODate.prototype.toString = function() {
		return this.formatDate(this._dateObject, this.dateFormat);
	};

	/**
	 * Returns the date
	 * @return {Number}
	 */
	ODate.prototype.getDate = function() {
		return this._dateObject.getDate();
	};

	/**
	 * Returns the month (0-11)
	 * @return {Number}
	 */
	ODate.prototype.getMonth = function() {
		return this._dateObject.getMonth();
	};

	/**
	 * Returns the full year (4 digits)
	 * @return {Number}
	 */
	ODate.prototype.getFullYear = function() {
		return this._dateObject.getFullYear();
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
	 * @param  {Date} dateObject A date object
	 * @param  {String} format     The format we want. Check the supported expressions below
	 * @return {String}            The formatted date
	 */
	ODate.prototype.formatDate = function(dateObject, format) {
		var expressions = ["dddd", "ddd", "dd", "d", "mmmm", "mmm", "mm", "m", "yyyy", "yy"];
		var replacements = [
				this.regional[this.locale].dayNames[dateObject.getDay()], 
				this.regional[this.locale].dayNamesShort[dateObject.getDay()], 
				this._addZero(dateObject.getDate()), 
				dateObject.getDate() + 1, 
				this.regional[this.locale].monthNames[dateObject.getMonth() + 1], 
				this.regional[this.locale].monthNamesShort[dateObject.getMonth() + 1],
				this._addZero(dateObject.getMonth() + 1), 
				dateObject.getMonth(), 
				dateObject.getFullYear(),
				dateObject.getFullYear().toString().substring(2, 4)
			];

		var result = format;

		for (var i = 0, length = expressions.length; i < length; i++) {
			var regEx = new RegExp(expressions[i]);
			if (regEx.test(format)) {
				result = result.replace(expressions[i], replacements[i]);
				format = format.replace(expressions[i], "");
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
