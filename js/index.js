$(document).ready(function() {
	// Variables
	var currentMonth = new Date().getMonth();
	var calendarHead = $('#calendar__head');

	var months = [
		'January', 'February', 'March',
		'April', 'May', 'June', 'July',
		'August', 'September', 'October',
		'November', 'December'
	];
	var days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];


	var thisMonth = months[currentMonth]; // Will be a string of current month
	var prevMonth = months[currentMonth - 1];
	var nextMonth = months[currentMonth + 1];

	var calendarYear = {};
	var year = new Date().getFullYear();

	// Generate weekday headers
	for (i = 0; i < days.length; i++) {
		var calendarHeadItem = document.createElement('div');
		calendarHeadItem.className = 'head__item';
		calendarHeadItem.innerText = days[i];
		calendarHead.append(calendarHeadItem);
	}

	for (var i = 0; i < months.length; i++) {
		calendarYear[months[i]] = {};
	};

	function daysInMonth(year, month) {
		return new Date(year, month, 0).getDate();
	};

	for (var i = 0; i< months.length; i++) {
		var daysInThisMonth = daysInMonth(year, i + 1);
		for (var j = 1; j < daysInThisMonth + 1; j++) {
			calendarYear[months[i]][j] = {};
			var dayOfWeek = new Date(months[i] + ' ' + j + ', ' + year);
			calendarYear[months[i]][j].dayOfWeek = days[dayOfWeek.getDay()];
		};
	};

	calendarYear.November['19'].event = {
		title: 'Birthday Party',
		time: '9:30pm',
		location: '123 Hickory St.'
	};

	var willsMonth = new Date().getMonth();
	var willsDay = new Date().getDate();

	console.log(calendarYear[months[willsMonth]][willsDay]);
	console.log(calendarYear);
});









// var date = new Date();
// var month = date.getMonth();
// var calendarTitle = document.getElementById("header__title");
// var calendarBody = document.getElementById("calendar__dates");
// var prev = document.getElementById("prev");
// var next = document.getElementById("next");
// var modalContainer = document.getElementById("modals");
// var newEvent = document.getElementById("new-event");
// var cancelModal = document.getElementById("cancel-modal");
// var submitModal = document.getElementById("submit-modal");
// var monthStart = new Date(year, month);
// var monthStartDayIndex = monthStart.getDay();
// var weeksArray = [];
// var week = 1;
// var dayCount = 0;
// var startDay = new Date(monthStart);

// console.log(date)
// console.log(month)

// // Event Listeners
// prev.addEventListener("click", goToPrev);
// next.addEventListener("click", goToNext);
// newEvent.addEventListener("click", openModal);
// cancelModal.addEventListener("click", closeModal);
// submitModal.addEventListener("click", submitModal);

// // Functions
// function getMonthYear() {
// 	calendarTitle.innerText = months[month] + " " + year;
// }

// function getDates() {
// 	while (calendarBody.hasChildNodes()) {
// 		calendarBody.removeChild(calendarBody.firstChild);
// 	}

// 	monthStart = new Date(year, month);
// 	monthStartDayIndex = monthStart.getDay();
// 	weeksArray = [];
// 	week = 1;
// 	dayCount = 0;
// 	startDay = new Date(monthStart);

// 	// Subtracting first of month's index from it's date to yield Sunday of first
// 	startDay.setDate(monthStart.getDate() - monthStartDayIndex);

// 	while (week < 7) {
// 		if (dayCount == 0) {
// 			weeksArray.push([]);
// 		}
// 		weeksArray[week - 1].push(startDay.getDate());
// 		dayCount++;
// 		startDay.setDate(startDay.getDate() + 1);
// 		if (dayCount == 7) {
// 			week++;
// 			dayCount = 0;
// 		}
// 	}

// 	weeksArray.forEach(function(array) {
// 		var row = document.createElement("div");
// 		row.className = "week";
// 		calendarBody.appendChild(row);

// 		for (i = 0; i < array.length; i++) {
// 			var tile = document.createElement("div");
// 			var tileNumber = document.createElement("div");
// 			tile.dataset.day = array[i];
// 			tile.dataset.month = month;
// 			tile.className = "tile";
// 			tileNumber.className = "tile__number";
// 			tileNumber.innerText = array[i];
// 			tile.appendChild(tileNumber);
// 			row.appendChild(tile);
// 			console.log({month,day:array[i]})
// 		}
// 	});
// }

// function getHead() {
// 	for (i = 0; i < days.length; i++) {
// 		var calendarHeadItem = document.createElement("div");
// 		calendarHeadItem.className = "head__item";
// 		calendarHeadItem.innerText = days[i];

// 		calendarHead.appendChild(calendarHeadItem);
// 	}
// }

// function goToPrev() {
// 	month--;
// 	if (month < 0) {
// 		month = 11;
// 		year--;
// 	}
// 	calendarTitle.innerText = months[month] + " " + year;
// 	getDates();
// }

// function goToNext() {
// 	month++;
// 	if (month > 11) {
// 		month = 0;
// 		year++;
// 	}
// 	calendarTitle.innerText = months[month] + " " + year;
// 	getDates();
// }

// function openModal() {
// 	modalContainer.style.opacity = "1";
// 	modalContainer.style.pointerEvents = "auto";
// }

// function closeModal() {
// 	modalContainer.style.opacity = "0";
// 	modalContainer.style.pointerEvents = "none";
// }

// function submitModal() {
// 	modalContainer.style.opacity = "0";
// 	modalContainer.style.pointerEvents = "none";
// }

// // Calls
// getMonthYear();
// getHead();
// getDates();