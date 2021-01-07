'use strict';

(function () {	
	var quantityRoomsToPrice = {
		'bungalo': '0',
		'flat': '1000',
		'house': '5000',
		'palace': '10000'
	};

	var roomNumber = document.querySelector('#room_number');
	var capacityNumber = document.querySelector('#capacity');
	var formSubmit = document.querySelector('.ad-form__submit');

	// Валидация комнат и гостей
	var getRoomsValidity = function (evt) {
		if (roomNumber.value == 1 && capacityNumber.value > 1) {
			capacityNumber.setCustomValidity('Выберете не больше 1-ого гостя');
		} else if (roomNumber.value == 2 && capacityNumber.value > 2) {
			capacityNumber.setCustomValidity('Выберете не больше 2-ух гостей');
		} else if (roomNumber.value < 100 && capacityNumber.value == 0) {
			capacityNumber.setCustomValidity('Не для гостей - выбирается только на 100 комнат');
		} else if (roomNumber.value == 100 && capacityNumber.value > 0) {
			capacityNumber.setCustomValidity('Выберете - не для гостей');
		} else {
			capacityNumber.setCustomValidity('');
		}	
	};

	getRoomsValidity();

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

		// 	default: 
		// 		throw new Error('Ошибка!');
		// }
	};

	getTypeValidity();

	typeHous.addEventListener('change', function () {
		getTypeValidity();
	});

	// Валидация времени заезда и выезда              // РАЗОБРАТЬСЯ -------------
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
})();