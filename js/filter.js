'use strict';

(function () {
	var valueToType = {
		'flat': 'flat',
		'bungalow': 'bungalow',
		'house': 'house',
		'palace': 'palace'
	};

	var valueToPrice = {
		'any': {
			'from': 0,
			'to': Infinity,
		},
		'middle': {
			'from': 10000,
			'to': 49999,
		},
		'low': {
			'from': 0,
			'to': 9999,
		},
		'high': {
			'from': 50000,
			'to': Infinity,
		}
	};

	var valueToRooms = {
		'1': '1',
		'2': '2',
		'3': '3'
	};

	var valueToGuests = {
		'2': '2',
		'1': '1',
		'0': '0'
	};

	var housingType = document.querySelector('#housing-type');
	var housingPrice = document.querySelector('#housing-price');
	var housingRooms = document.querySelector('#housing-rooms');
	var housingGuests = document.querySelector('#housing-guests');

	var filterWifi = document.querySelector('#filter-wifi');
	var filterDishwasher = document.querySelector('#filter-dishwasher');
	var filterWasher = document.querySelector('#filter-washer');
	var filterParking = document.querySelector('#filter-parking');
	var filterElevator = document.querySelector('#filter-elevator');
	var filterConditioner = document.querySelector('#filter-conditioner');

	var data = [];

	// Получение данных
	var getData = function (dataForPins) {
		data = dataForPins;
		window.map.createCardsAndPins();
	};

	// Фильтрация данных
	var getFilter = function () {
		var pinsFilterType = data.filter(function (pin) {
			var pinType = pin.offer.type;

			if (housingType.value === 'any') { // ПОДУМАТЬ КАК ДОБАВИТЬ В СЛОВАРЬ
				return pin;
			} 

			return housingType.value === valueToType[pinType];
		});	

		var pinsFilterPrice = pinsFilterType.filter(function (pin) {
			var pinPrice = pin.offer.price;

			return pinPrice >= valueToPrice[housingPrice.value].from && pinPrice <= valueToPrice[housingPrice.value].to;
		});

		var pinsFilterRooms = pinsFilterPrice.filter(function (pin) {
			var pinRooms = pin.offer.rooms;

			if (housingRooms.value === 'any') { // ПОДУМАТЬ КАК ДОБАВИТЬ В СЛОВАРЬ
				return pin;
			} 

			return housingRooms.value === valueToRooms[pinRooms];
		});

		var pinsFilterGuests = pinsFilterRooms.filter(function (pin) {
			var pinGuests = pin.offer.guests;

			if (housingGuests.value === 'any') { // ПОДУМАТЬ КАК ДОБАВИТЬ В СЛОВАРЬ
				return pin;
			} 

			return housingGuests.value === valueToGuests[pinGuests];
		});

		var pinsFilterFeatures = pinsFilterGuests.filter(function (pin) {
			var pinFeatures = pin.offer.features;
			var features = document.querySelectorAll('input[name=features]:checked');

			for (var i = 0; i < features.length; i++) {
				if (!pinFeatures.includes(features[i].value)) {
					return false;
				}
			}

			return true;
		});

		return pinsFilterFeatures;
	};

	var getFilterMaxPins = function (arrayPins) { // СКОРЕЕ ВСЕГО ПЕРЕДЕЛАТЬ ФИЛЬТРАЦИЮ КОЛИЧЕСТВА
		var maxPins = arrayPins.filter(function (pin, index) {
			if (index < 5) {
				return pin;
			}
		});

		return maxPins;
	};

	var getFilterMaxCards = function (arrayCards) { // СКОРЕЕ ВСЕГО ПЕРЕДЕЛАТЬ ФИЛЬТРАЦИЮ КОЛИЧЕСТВА
		var maxCards = arrayCards.filter(function (card, index) {
			if (index < 5) {
				return card;
			}
		});

		return maxCards;
	};

	// Перерисовка pins с новыми фильтрами
	var rebootFilter = function () {
		var allPins = document.querySelectorAll('.map__pin');
		var card = document.querySelector('.map__card');

		for (var i = 1; i < allPins.length; i++) {
			allPins[i].remove();
		}

		if (card) {
			card.remove();
		}

		window.map.createCardsAndPins();
	};

	housingType.addEventListener('change', rebootFilter);
	housingPrice.addEventListener('change', rebootFilter);
	housingRooms.addEventListener('change', rebootFilter);
	housingGuests.addEventListener('change', rebootFilter);
	filterWifi.addEventListener('change', rebootFilter);
	filterDishwasher.addEventListener('change', rebootFilter);
	filterParking.addEventListener('change', rebootFilter);
	filterWasher.addEventListener('change', rebootFilter);
	filterElevator.addEventListener('change', rebootFilter);
	filterConditioner.addEventListener('change', rebootFilter);

	window.filter = {
		getData: getData,
		getFilter: getFilter,
		getFilterMaxPins: getFilterMaxPins,
		getFilterMaxCards: getFilterMaxCards
	};
})();