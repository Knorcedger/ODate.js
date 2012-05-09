/*jshint smarttabs: true*/

(function() {
	"use strict";

	/**
	 * An object that provides usefull functions with dates
	 */
	var ODate = function() {
			this._todayString = this._findTodayDate();
			this._todayObject = new Date();
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
	 * Create a date object from the given date string
	 * @return {Object} A date object
	 */
	ODate.prototype._updateTodayObject = function(newDate) {
		var dateArray = newDate.split("/");
		var todayObject = new Date(dateArray[2], dateArray[1], dateArray[0]);

		this._todayObject = todayObject;
	};

	/**
	 * Returns the today date as it is currenctly saved in the object
	 * @return {string}
	 */
	ODate.prototype.today = function() {
		return this._todayString;
	};

	/**
	 * Returns the today date in this format: "08/05/2012"
	 * @return {String}
	 */
	ODate.prototype._findTodayDate = function() {
		var today = new Date();
		var todayDate = this._addZero(today.getDate()) + '/' + this._addZero(today.getMonth() + 1) + '/' + today.getFullYear();

		return todayDate;
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
	 * Add a leeding zeros to numbers smaller than 10
	 * @param  {String} value
	 * @return {String}
	 */
	ODate.prototype._addZero = function(value) {
		var result;
		if (value < 10) {
			result = '0' + value;
		} else {
			result = value;
		}

		return result;
	};
}());
