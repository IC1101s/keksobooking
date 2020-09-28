'use strict';

(function () {
	// Функция с заполнением данных в template #pin
	var mapPin = document.querySelector('#pin')
	.content.querySelector('.map__pin');

	var createPins = function (pin) {
		var pinElement = mapPin.cloneNode(true);
		var pinElementImg = pinElement.querySelector('img');

		pinElement.style.left = pin.location.x + 'px';
		pinElement.style.top = pin.location.y + 'px';
		pinElementImg.src = pin.author.avatar;
		pinElementImg.alt = pin.offer.title;

		return pinElement;
	};

	window.pin = createPins;
})();