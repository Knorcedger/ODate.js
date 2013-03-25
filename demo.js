(function() {
	"use strict";

	var odate = new ODate();
	console.log(odate);
	console.log(odate.date());
	odate.setToday(2013, 11, 31);
	console.log(odate.date());
	odate.format.set("dddd ddd dd d mmmm mmm mm m yy yyyy timestamp");
	console.log(odate.date());
})();