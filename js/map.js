'use strict';

(function () {	
	var pinsContainer = document.querySelector('.map__pins');

	var arrayPins = [];
	var arrayCards = [];

	/*
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
	*/

	// Функция c отрисовкой pins в pinsContainer
	var onRenderingPins = function (pins) {
		var createPins = window.pin;
		var fragment = document.createDocumentFragment();
		
		for (var i = 0; i < pins.length; i++) {
			fragment.appendChild(createPins(pins[i]));
		}

		pinsContainer.appendChild(fragment);	

		var pins = document.querySelectorAll('.map__pin');

		for (var j = 1; j < pins.length; j++) {
			arrayPins.push(pins[j]);
		}
	};

	// Функция c отрисовкой cards в map
	var onRenderingCards = function (cards) {
		var createCards = window.card;
	
		for (var i = 0; i < cards.length; i++) {
			arrayCards.push(createCards(cards[i]));
		}
	};

	window.map = {
		onRenderingPins: onRenderingPins,
		onRenderingCards: onRenderingCards,
		arrayPins: arrayPins,
		arrayCards: arrayCards
	};
})();
