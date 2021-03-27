'use strict';

(function () {
	var pinsContainer = document.querySelector('.map__pins');

	var arrayPins = [];
	var arrayCards = [];

	// Функция для заполнения отфильтрованых данных в arrayCards и arrayPins
	var createCardsAndPins = function () {
		var allPins = document.querySelectorAll('.map__pin');
		var card = document.querySelector('.map__card');

		var createCards = window.card;
		var createPins = window.pin;
		var dataFilter = window.filter.getFilter();	
		
		arrayPins = [];
		arrayCards = [];

		for (var i = 1; i < allPins.length; i++) {
			allPins[i].remove();
		}

		if (card) {
			card.remove();
		}
		
		for (var i = 0; i < dataFilter.length; i++) {
			arrayPins.push(createPins(dataFilter[i]));	
			arrayCards.push(createCards(dataFilter[i]));
		}

		renderingPins(arrayPins);
		window.opencards(arrayPins, arrayCards);
	};

	// Функция для отрисовки pins
	var renderingPins = function (pin) {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < pin.length; i++) {
			fragment.appendChild(pin[i]);
		}

		pinsContainer.appendChild(fragment);

		window.condition.activationFilters();		
	};

	window.map = {
		arrayCards: arrayCards,
		arrayPins: arrayPins,
		createCardsAndPins: createCardsAndPins
	};
})();
