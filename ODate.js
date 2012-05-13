/*jshint smarttabs: true*/

var ODate;

(function() {
	"use strict";

	/**
	 * An object that provides usefull functions with dates
	 */
	ODate = function() {
		this._todayString = this._findTodayDate();
		this._todayObject = new Date();

		this.locale = "en";
		this.regional = {};
		this.regional["en"] = {};
		this.regional["en"].dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		this.regional["en"].dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		//this.regional["en"].dayNamesMin = ["Su","Mo","Tu","We","Th","Fr","Sa"];
		this.regional["en"].monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		this.regional["en"].monthNames = ["January", "February", "March", "April", "May", "June", "July", "AUgust", "September", "October", "November", "December"];
	};

	/**
	 * Updates the todayDate used
	 * @param {String} todayDate A date in a format like: "08/05/2012"
	 */
	ODate.prototype.setToday = function(todayString) {
		var today = todayString;
		this._todayString = todayString;

		this._updateTodayObject(todayString);
	};

	/**
	 * Returns the today date as it is currenctly saved in the object
	 * @return {string}
	 */
	ODate.prototype.today = function() {
		return this._todayString;
	};

	/**
	 * Returns the yesterday date in this format: "08/05/2012"
	 * @return {String}
	 */
	ODate.prototype.yesterday = function() {
		var yesterday = new Date();
		yesterday.setDate(this._todayObject.getDate() - 1);

		var yesterdayDate = this._addZero(yesterday.getDate()) + "/" + this._addZero(yesterday.getMonth() + 1) + "/" + yesterday.getFullYear();

		return yesterdayDate;
	};

	/**
	 * Returns the one month back date in this format: "08/05/2012"
	 * @return {String}
	 */
	ODate.prototype.oneMonthBack = function() {
		var daysInPreviousMonth = this.daysInMonth(this._todayObject.getMonth(), this._todayObject.getFullYear());

		var oneMonthBack = new Date();
		oneMonthBack.setDate(-(daysInPreviousMonth - this._todayObject.getDate()));

		var oneMonthBackDate = this._addZero(oneMonthBack.getDate()) + "/" + this._addZero(oneMonthBack.getMonth() + 1) + "/" + oneMonthBack.getFullYear();

		return oneMonthBackDate;
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

		var expressions = ["dddd", "ddd", "dd", "d", "mmmm", "mmm", "mm", "m", "yyyy"];
		var replacements = [
				this.regional[this.locale].dayNames[dateObject.getDay()], 
				this.regional[this.locale].dayNamesShort[dateObject.getDay()], 
				this._addZero(dateObject.getDate()), 
				dateObject.getDate(), 
				this.regional[this.locale].monthNames[dateObject.getMonth()], 
				this.regional[this.locale].monthNamesShort[dateObject.getMonth()],
				this._addZero(dateObject.getMonth()), 
				dateObject.getMonth(), 
				dateObject.getFullYear()
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
	 * Create a date object from the given date string
	 * @return {Object} A date object
	 */
	ODate.prototype._updateTodayObject = function(newDate) {
		var dateArray = newDate.split("/");
		var todayObject = new Date(dateArray[2], dateArray[1], dateArray[0]);

		this._todayObject = todayObject;
	};

	/**
	 * Returns the today date in this format: "08/05/2012"
	 * @return {String}
	 */
	ODate.prototype._findTodayDate = function() {
		var today = new Date();
		var todayDate = this._addZero(today.getDate()) + "/" + this._addZero(today.getMonth() + 1) + "/" + today.getFullYear();

		return todayDate;
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


var d = new ODate();
console.log(d.formatDate(new Date(), "dddd/mm/yyyy"));
//d.setLocalization.monthNames("");
