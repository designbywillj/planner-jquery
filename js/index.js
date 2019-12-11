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
	$(days).each(function(i, el) {
		var calendarHeadItem = document.createElement('div');
		calendarHeadItem.className = 'head__item';
		calendarHeadItem.innerText = el;
		calendarHead.append(calendarHeadItem);
	});

	$(months).each(function(i, el) {
		calendarYear[el] = {};
	});

	function daysInMonth(year, month) {
		return new Date(year, month, 0).getDate();
	};

	$(months).each(function(i, month) {
		$([...Array(daysInMonth(year, i + 1)).keys()]).each(function(j, _day) {
			var day = _day + 1;
			calendarYear[month][day] = {};
			var dayOfWeek = new Date(month + ' ' + day + ', ' + year);
			calendarYear[month][day].dayOfWeek = days[dayOfWeek.getDay()];
			calendarYear[month][day].calendarDate = day;
		});
	});

	calendarYear.December['19'].event = {
		title: 'Birthday Party',
		time: '9:30pm',
		location: '123 Hickory St.'
	};

	var willsYear = new Date().getFullYear();
	var willsMonth = new Date().getMonth();
	var willsDay = new Date().getDate();

	var grid = [...Array(6 * 7).keys()];

	function renderGrid() {
		$('#calendar__dates').empty();

		$(grid).each(function(i) {
			var dayOfRowWeek = i % 7;
			var dayOfColumn = i + 1;
	
			var tile = document.createElement('div');
			var tileNumber = document.createElement('div');
			tile.className = 'tile';
			tileNumber.className = 'tile__number';

			function pad(number) {
				return (number < 10 ? '0' : '') + number;
		   	};
			
			if (calendarYear[months[willsMonth]]
				&& calendarYear[months[willsMonth]][dayOfColumn]
				&& calendarYear[months[willsMonth]][dayOfColumn].dayOfWeek === days[dayOfRowWeek]) {
					$(tile).attr('date', willsYear + '-' + pad(willsMonth+1) + '-' + pad(calendarYear[months[willsMonth]][dayOfColumn].calendarDate));
					tileNumber.innerText = calendarYear[months[willsMonth]][dayOfColumn].calendarDate;
					tile.style.cursor = 'pointer';
					if (calendarYear[months[willsMonth]][dayOfColumn] && calendarYear[months[willsMonth]][dayOfColumn].eventName) {
						var event = document.createElement('div');
						event.className = 'tile__event';
						event.innerText = calendarYear[months[willsMonth]][dayOfColumn].eventName;
						$(tile).append(event);
					};
				} else {
					tileNumber.innerText = '';
					dayOfColumn = 0;
				};
				
			tile.appendChild(tileNumber);
			$('#calendar__dates').append(tile);
		});
	};
	renderGrid();

	var modalContainer = $('#modals');
	var newEvent = $('#new-event');
	var cancelModal = $('#cancel-modal');

	$('#prev').click(function() {
		willsMonth --;
		renderGrid();
	});

	$('#next').click(function() {
		willsMonth ++;
		renderGrid();
	});

	$('#submit-modal').click(function(e) {
		e.preventDefault();
		var eventName = $('#event-name').val();
		var eventDate = $('#event-date').val();
		var convertedDate = new Date(eventDate);
		var convertedYear = convertedDate.getFullYear();
		var convertedMonth = convertedDate.getMonth();
		var convertedDay = convertedDate.getDate()+1;

		calendarYear[months[convertedMonth]][convertedDay].eventName = eventName;
		console.log({eventName, convertedYear, convertedMonth, convertedDay});
		renderGrid();
		closeModal();
		$('#event-name').val('');
		$('#event-date').val('');
	});

	$(newEvent).click(function() {
		$(modalContainer).css({'opacity': '1', 'pointer-events': 'auto'});
	});

	$('.tile').on('click', function(e) {
		console.log(e);
		console.log(this);
		$(modalContainer).css({'opacity': '1', 'pointer-events': 'auto'});
		$('#event-date').val(e.target.getAttribute('date'));
	});

	function closeModal() {
		$(modalContainer).css({'opacity': '0', 'pointer-events': 'none'});
		$('#event-name').val('');
		$('#event-date').val('');
	};

	$(cancelModal).click(closeModal);
	$(cancelModal).click(closeModal);

	console.log(calendarYear[months[willsMonth]]);
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