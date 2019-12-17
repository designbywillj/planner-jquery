$(document).ready(function() {
	// Variables
	var calendarHead = $('#calendar__head');
	var months = [
		'January', 'February', 'March',
		'April', 'May', 'June', 'July',
		'August', 'September', 'October',
		'November', 'December'
	];
	var days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
	var calendarYear = {};
	var year = new Date().getFullYear();
	var willsYear = new Date().getFullYear();
	var willsMonth = new Date().getMonth();
	var modalContainer = $('#modals');
	var newEvent = $('#new-event');
	var cancelModal = $('#cancel-modal');

	// Set month and year title
	$('#header__title').text(months[willsMonth] + ' ' + willsYear);

	// Generate weekday headers
	$(days).each(function(i, el) {
		var calendarHeadItem = document.createElement('div');
		calendarHeadItem.className = 'head__item';
		calendarHeadItem.innerText = el;
		calendarHead.append(calendarHeadItem);
	});

	// Generate months of the year
	$(months).each(function(i, el) {
		calendarYear[el] = {};
	});

	// Get days in month
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

	// Render dates of month and any stored events
	var grid = [...Array(6 * 7).keys()];
	function renderGrid(mth) {
		// Clear grid
		$('#calendar__dates').empty();

		// Get all dates in month and create grid
		$(grid).each(function(i) {
			var dayOfRowWeek = i % 7;
			var dayOfColumn = i + 1;
	
			var tile = document.createElement('div');
			var tileNumber = document.createElement('div');
			tile.className = 'tile';
			tileNumber.className = 'tile__number';

			// Padding numbers < 10 with 0
			function pad(number) {
				return (number < 10 ? '0' : '') + number;
		   	};
			
			// Assigning and appending dates and events to appropriate tiles
			if (calendarYear[months[mth]]
				&& calendarYear[months[mth]][dayOfColumn]
				&& calendarYear[months[mth]][dayOfColumn].dayOfWeek === days[dayOfRowWeek]) {
					$(tile).attr('date', willsYear + '-' + pad(mth+1) + '-' + pad(calendarYear[months[mth]][dayOfColumn].calendarDate));
					tileNumber.innerText = calendarYear[months[mth]][dayOfColumn].calendarDate;
					tile.style.cursor = 'pointer';
					if (calendarYear[months[mth]][dayOfColumn] && calendarYear[months[mth]][dayOfColumn].eventName) {
						var event = document.createElement('div');
						event.className = 'tile__event';
						event.innerText = calendarYear[months[mth]][dayOfColumn].eventName;
						$(event).attr('event-name', calendarYear[months[mth]][dayOfColumn].eventName);
						// $(event).attr('event-id', Math.random().toString(36).substring(7));
						$(tile).append(event);
					};
				} else {
					tileNumber.innerText = '';
					dayOfColumn = 0;
					tile.style.pointerEvents = 'none';
				};

			tile.appendChild(tileNumber);
			$('#calendar__dates').append(tile);
		});
	};
	renderGrid(willsMonth);

	// Navigate to previous month
	$('#prev').click(function() {
		willsMonths = willsMonth--;
		renderGrid(willsMonth);
	});

	// Navigate to next month
	$('#next').click(function() {
		renderGrid(willsMonth++);
	});

	// Submitting modal to create/update events
	$('#submit-modal').click(function(e) {
		e.preventDefault();
		var eventName = $('#event-name').val();
		var eventDate = $('#event-date').val();
		var convertedDate = new Date(eventDate.replace('-', '/'));
		var convertedYear = convertedDate.getFullYear();
		var convertedMonth = convertedDate.getMonth();
		var convertedDay = convertedDate.getDate();

		calendarYear[months[convertedMonth]][convertedDay].eventName = eventName;
		console.log({eventName, convertedYear, convertedMonth, convertedDay});
		renderGrid(willsMonth);
		closeModal();
		$('#event-name').val('');
		$('#event-date').val('');
	});

	// Create event when clicking button
	$(newEvent).click(function() {
		$(modalContainer).css({'opacity': '1', 'pointer-events': 'auto'});
		$('#modal-title').text('Create a New Event');
		$('#submit-modal').text('Create Event');
	});

	// Create event when clicking tile
	$('#calendar__dates').on('click', '.tile', function(e) {
		$(modalContainer).css({'opacity': '1', 'pointer-events': 'auto'});
		$('#event-date').val(e.target.getAttribute('date'));
		$('#modal-title').text('Create a New Event');
		$('#submit-modal').text('Create Event');
	});

	// Edit event
	$('#calendar__dates').on('click', '.tile__event', function(e) {
		var eventParent = $(this).parent();

		$(modalContainer).css({'opacity': '1', 'pointer-events': 'auto'});
		$('#modal-title').text('Edit ' + $('.tile__event').attr('event-name'));
		$('#submit-modal').text('Save Event');
		$('#event-name').val($('.tile__event').attr('event-name'));
		$('#event-date').val(eventParent.attr('date'));
		$('#modal__footer').prepend('<button type="button" id="delete-event" class="btn btn--flat btn--square"><img src="asset/icon/delete.svg"/></button>');
		e.stopPropagation();
	});

	// Delete event
	$('#modal__footer').on('click', '#delete-event', function(e) {
		e.preventDefault();
		console.log($('#event-date').val())
		var selectedDate = new Date($('#event-date').val());
		delete calendarYear[months[selectedDate.getMonth()]][selectedDate.getDate()+1].eventName;
		renderGrid(willsMonth);
		$('#delete-event').remove();
		closeModal();
	});

	// Close modal
	function closeModal() {
		$(modalContainer).css({'opacity': '0', 'pointer-events': 'none'});
		$('#event-name').val('');
		$('#event-date').val('');
		$('#delete-event').remove();
	}

	// Event listener for modal 'Cancel' button
	$(cancelModal).click(closeModal);

	console.log(calendarYear[months[willsMonth]]);
});