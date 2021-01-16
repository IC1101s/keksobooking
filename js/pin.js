'use strict';

(function () {
	var WIDTH_HALF_PIN = 25;
	var HEIGHT_PIN = 70;

	var mapPin = document.querySelector('#pin')
	.content.querySelector('.map__pin');

	// Функция с заполнением данных в элементы pins
	var fillingDataPins = function (pin) {
		var pinElement = mapPin.cloneNode(true);
		var pinElementImg = pinElement.querySelector('img');

		pinElement.style.left = pin.location.x - WIDTH_HALF_PIN + 'px';
		pinElement.style.top = pin.location.y - HEIGHT_PIN + 'px';
		pinElementImg.src = pin.author.avatar;
		pinElementImg.alt = pin.offer.title;

		return pinElement;
	};

	window.pin = fillingDataPins;
})();