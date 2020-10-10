'use strict';

(function () {
	var ECS_KEY = 'Escape';
	
	var map = document.querySelector('.map');
	var filtersContainer = document.querySelector('.map__filters-container');

	var openCard = function () {
		var pins = window.map.arrayPins;
		var cards = window.map.arrayCards;
		console.log(pins);
		console.log(cards);

		for (var i = 0; i < pins.length; i++) {
			(function (mapPin, mapCard) {
				mapPin.addEventListener('click', function () {
					map.insertBefore(mapCard, filtersContainer);

					// Удаление ненужных feature
					var feature = document.querySelectorAll('.popup__feature');
					for (var i = 0; i < feature.length; i++) {
						if (feature[i].textContent === '') {	
							feature[i].remove();
						}
					}

					// Удаление карточки, если их больше 1 в массиве
					var allCard = map.querySelectorAll('.map__card');
					if (allCard.length > 1) {
						allCard[0].remove();
					}

					// Удаление карточки по клику и Esc
					(function () {
						var cardСlose = map.querySelector('.popup__close');
						var card = map.querySelector('.map__card');

						var onClickCloseCard = function () {
							if (card) {
								card.remove();
							} // какая-та проблема с null			
						};

						var onDownEscCloseCard = function (evt) {	
							if (card && evt.key === ECS_KEY) {
								card.remove();
							}		
						};

						cardСlose.addEventListener('click', onClickCloseCard);
						document.addEventListener('keydown', onDownEscCloseCard);
					})();
				});
			})(pins[i], cards[i]);
		} 	
	};

	window.opencards = openCard;
})();