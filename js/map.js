'use strict';

(function () {	
	var pinsContainer = document.querySelector('.map__pins');

	var arrayCards = [];
	var arrayPins = [];
	
	// Функция 
	var onCreatePins = function (pins) {
		var createPins = window.pin;
		
		for (var i = 0; i < pins.length; i++) {
			arrayPins.push(createPins(pins[i]));	
		}

		console.log(arrayPins);
	};

	// Функция 
	var onCreateCards = function (cards) {
		var createCards = window.card;
	
		for (var i = 0; i < cards.length; i++) {
			arrayCards.push(createCards(cards[i]));
		}
	};

	// Функция 
	var onRenderingPins = function () {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < arrayPins.length; i++) {
			fragment.appendChild(arrayPins[i]);
		}

		pinsContainer.appendChild(fragment);
	};

	window.backend.load(onCreatePins);
	window.backend.load(onCreateCards);

	window.map = {
		onRenderingPins: onRenderingPins,
		arrayCards: arrayCards,
		arrayPins: arrayPins
	};
})();
