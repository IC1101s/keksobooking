'use strict';

(function () {	
	var quantityRoomsToPrice = {
		'bungalow': '0',
		'flat': '1000',
		'house': '5000',
		'palace': '10000'
	};

	var roomNumber = document.querySelector('#room_number');
	var capacityNumber = document.querySelector('#capacity');

	// Валидация комнат и гостей
	var getRoomsValidity = function (evt) {
		if (roomNumber.value == 1 && capacityNumber.value > 1) {
			capacityNumber.setCustomValidity('Choose no more than 1 guest');
		} else if (roomNumber.value == 2 && capacityNumber.value > 2) {
			capacityNumber.setCustomValidity('Choose no more than 2 guests');
		} else if (roomNumber.value < 100 && capacityNumber.value == 0) {
			capacityNumber.setCustomValidity('Not for guests - only selectable for 100 rooms');
		} else if (roomNumber.value == 100 && capacityNumber.value > 0) {
			capacityNumber.setCustomValidity('Choose - not for guests');
		} else {
			capacityNumber.setCustomValidity('');
		}	
	};

	roomNumber.addEventListener('change', function () {
		getRoomsValidity();
	});

	capacityNumber.addEventListener('change', function () {
		getRoomsValidity();
	});

	// Валидация типа жилья с ценой
	var typeHous = document.querySelector('#type'); 
	var priceHous = document.querySelector('#price');

	var getTypeValidity = function () {
		priceHous.min = quantityRoomsToPrice[typeHous.value];
		priceHous.placeholder = quantityRoomsToPrice[typeHous.value];	
	};	

	typeHous.addEventListener('change', function () {
		getTypeValidity();
	});

	// Валидация времени заезда и выезда          
	var timeIn = document.querySelector('#timein');
	var timeOut = document.querySelector('#timeout');

	var getTimeValidity = function (checkInTime, checkOutTime) {
		checkOutTime.value = checkInTime.value;
	};

	timeIn.addEventListener('change', function () {
		getTimeValidity(timeIn, timeOut);
	});

	timeOut.addEventListener('change', function () {
		getTimeValidity(timeOut, timeIn);
	});

	// Первичная валидация и валидация после опубликовки
	var getStartValidity = function () {
		getTypeValidity();
		getRoomsValidity();
	};

	getStartValidity();

	window.validity = getStartValidity;
})();