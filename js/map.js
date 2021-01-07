'use strict';

(function () {
	var pinsContainer = document.querySelector('.map__pins');
	var housingType = document.querySelector('#housing-type');

	var arrayCards = [];
	var arrayPins = [];
 	
	/*var getData = function (data) {
		var dataPins = [];

		for (var i = 0; i < data.length; i++) {
			dataPins.push(data[i]);
		}

		window.filter.test(dataPins);
		window.filter.getFiltration();
	};*/

	// Функция для заполнения данных в arrayCards и arrayPins
	var onCreateCardsAndPins = function (dataPins) {
		var createCards = window.card;
		var createPins = window.pin;

		console.log(arrayPins);
		
		for (var j = 0; j < dataPins.length; j++) {
			arrayPins.push(createPins(dataPins[j]));	
			arrayCards.push(createCards(dataPins[j]));
		}

		// onRenderingPins();

		// window.opencards();
	};

	// Функция для отрисовки pins
	var onRenderingPins = function () {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < arrayPins.length; i++) {
			fragment.appendChild(arrayPins[i]);
		}

		pinsContainer.appendChild(fragment);		
	};

	window.map = {
		arrayCards: arrayCards,
		arrayPins: arrayPins,
		// getData: getData,
		onCreateCardsAndPins: onCreateCardsAndPins,
		onRenderingPins: onRenderingPins
	};
})();
