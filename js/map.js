'use strict';

(function () {	
	var pinsContainer = document.querySelector('.map__pins');

	var arrayPins = [];
	var arrayCards = [];

	// Функция c отрисовкой pins в pinsContainer
	var renderingPins = function () {
		var pinsData = window.data();
		var createPin = window.pin;
		var fragment = document.createDocumentFragment();	
		
		for (var i = 0; i < pinsData.length; i++) {
			fragment.appendChild(createPin(pinsData[i]));
		}

		pinsContainer.appendChild(fragment);	

		var pins = document.querySelectorAll('.map__pin');

		for (var j = 1; j < pins.length; j++) {
			arrayPins.push(pins[j]);
		}
	};

	// Функция c отрисовкой cards в map
	var renderingCards = function () {
		var cardData = window.data();
		var createCard = window.card;
	
		for (var i = 0; i < cardData.length; i++) {
			arrayCards.push(createCard(cardData[i]));
		}
	};

	window.map = {
		renderingPins: renderingPins,
		renderingCards: renderingCards,
		arrayPins: arrayPins,
		arrayCards: arrayCards
	};
})();
