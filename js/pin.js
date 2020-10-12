'use strict';

(function () {
	var WIDTH_PIN = 50;
	var HALF_WIDTH_PIN = WIDTH_PIN / 2;
	var HEIGHT_PIN = 70;

	var mapPin = document.querySelector('#pin')
	.content.querySelector('.map__pin');

	// Функция с заполнением данными в элементы pins
	var fillingDataPins = function (pin) {
		var pinElement = mapPin.cloneNode(true);
		var pinElementImg = pinElement.querySelector('img');

		pinElement.style.left = pin.location.x - HALF_WIDTH_PIN + 'px';
		pinElement.style.top = pin.location.y - HEIGHT_PIN + 'px';
		pinElementImg.src = pin.author.avatar;
		pinElementImg.alt = pin.offer.title;

		return pinElement;
	};

	window.pin = fillingDataPins;
})();