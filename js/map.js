'use strict';

(function () {
	var pinsContainer = document.querySelector('.map__pins');

	var arrayPins = [];
	var arrayCards = [];

	// Функция для заполнения отфильтрованых данных в arrayCards и arrayPins
	var createCardsAndPins = function () {
		var createCards = window.card;
		var createPins = window.pin;
		var dataFilter = window.filter.getFilter();

		var maxPins = window.filter.getFilterMaxPins;
		var maxCards = window.filter.getFilterMaxCards;

		arrayPins = [];
		arrayCards = [];
		
		for (var j = 0; j < dataFilter.length; j++) {
			arrayPins.push(createPins(dataFilter[j]));	
			arrayCards.push(createCards(dataFilter[j]));
		}

		renderingPins(maxPins(arrayPins));
		window.opencards(maxPins(arrayPins), maxCards(arrayCards)); // СКОРЕЕ ВСЕГО ПЕРЕДАЛТЬ ФИЛЬТРАЦИЮ КОЛИЧЕСТВА
	};

	// Функция для отрисовки pins
	var renderingPins = function (pin) {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < pin.length; i++) {
			fragment.appendChild(pin[i]);
		}

		pinsContainer.appendChild(fragment);		
	};

	window.map = {
		arrayCards: arrayCards,
		arrayPins: arrayPins,
		createCardsAndPins: createCardsAndPins
	};
})();
