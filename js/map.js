'use strict';

(function () {	
	var pinsContainer = document.querySelector('.map__pins');

/*	var arrayPins = [];
	var arrayCards = [];

	console.log(arrayPins.length);
	console.log(arrayCards.length);
*/
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

/*	var test = function (pins) {
		var arrayPins = [];
		// var pins = document.querySelectorAll('.map__pin');

		for (var j = 0; j < pins.length; j++) {
			arrayPins.push(pins[j]);
		}
		console.log('test');

		window.arrayPins = arrayPins;
	};*/

	

	// var test = function (fragment) {
	// 	var fragments = [];

	// 	for (var i = 0; i < pins.length; i++) {
	// 		test(fragment.appendChild(createPins(pins[i])));
	// 		arrayPins.push(createPins(pins[i]));
	// 	}

	// 	var test2 = function (fragments) {
	// 		pinsContainer.appendChild(fragments);
	// 	}

	// 	return test2;
	// };

	var arrayCards = [];
	var arrayPins = [];

	var test = function () {
		
		var test2 = function () {
			for (var i = 0; i < 10; i++) {
				pinsContainer.appendChild(arrayPins[i]);
			}

			console.log('test2');
		};

		console.log('test');

		console.log(arrayPins);

		window.test2 = test2;
	};	

	
	// Функция c отрисовкой pins в pinsContainer
	var onRenderingPins = function (pins) {
		var createPins = window.pin;
		var fragment = document.createDocumentFragment();
		
		for (var i = 0; i < pins.length; i++) {
			arrayPins.push(createPins(pins[i]));	
		}

		test(fragment);

		console.log('pins');
	};

	window.backend.load(onRenderingPins);

	// Функция c отрисовкой cards в map
	var onRenderingCards = function (cards) {
		var createCards = window.card;
	
		for (var i = 0; i < cards.length; i++) {
			arrayCards.push(createCards(cards[i]));
		}

		console.log('card');
	};

	window.backend.load(onRenderingCards);

	window.map = {
		onRenderingPins: onRenderingPins,
		onRenderingCards: onRenderingCards,
		arrayCards: arrayCards,
		arrayPins: arrayPins
	};
})();
