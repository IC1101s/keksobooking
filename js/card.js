'use strict';

(function () {
	// Функция с заполнением данных в template #card
	var mapCard = document.querySelector('#card')
	.content.querySelector('.map__card');

	var createCards = function (card) {
		var cardElement = mapCard.cloneNode(true);

		//////
		cardElement.querySelector('.popup__title').textContent = card.offer.title;

		//////
		for (var i = 0; i < 2; i++) {
			cardElement.querySelector('.popup__text--address').textContent = card.location.x + ' ' + card.location.y;
		}

		//////
		cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

		//////
		var typeCard = cardElement.querySelector('.popup__type');
		var typeArray = card.offer.type[window.random(0, card.offer.type.length - 1)];

		if (typeArray === 'flat') {
			typeCard.textContent = 'Квартира';
		} else if (typeArray === 'bungalo') {
			typeCard.textContent = 'Бунгало';
		} else if (typeArray === 'house') {
			typeCard.textContent = 'Дом';
		} else if (typeArray === 'palace') {
			typeCard.textContent = 'Дворец';
		} else {
			typeCard.textContent = 'Неизвестно';
		}

		//////
		cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms
		+ ' комнаты для ' + card.offer.guests + ' гостей';

		//////
		cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' 
		+ card.offer.checkin[window.random(0, 2)] + ' выезд до ' + card.offer.checkout[window.random(0, 2)];
		
		//////
		for (var j = 0; j < window.random(1, card.offer.features.length); j++) {
			var cardFeature = card.offer.features[j];		

			if (cardFeature === 'wifi') {			
				cardElement.querySelector('.popup__feature--wifi').textContent = cardFeature;
			} else if (cardFeature === 'dishwasher') {
				cardElement.querySelector('.popup__feature--dishwasher').textContent = cardFeature;
			} else if (cardFeature === 'parking') {
				cardElement.querySelector('.popup__feature--parking').textContent = cardFeature;
			} else if (cardFeature === 'washer') {
				cardElement.querySelector('.popup__feature--washer').textContent = cardFeature;
			} else if (cardFeature === 'elevator') {
				cardElement.querySelector('.popup__feature--elevator').textContent = cardFeature;
			} else if (cardFeature === 'conditioner') {
				cardElement.querySelector('.popup__feature--conditioner').textContent = cardFeature;
			}
		}

		//////
		cardElement.querySelector('.popup__description').textContent = card.offer.description;
		
		//////	
		for (var c = 0; c < 2; c++) {
			var pictures = cardElement.querySelector('.popup__photos');
			var image = cardElement.querySelector('.popup__photo').cloneNode(true);

			pictures.appendChild(image);		
		}

		for (var d = 0; d < 3; d++) {
			var images = cardElement.querySelectorAll('.popup__photo');

	  		images[d].src = card.offer.photos[d];
	  	}

	  	//////
		cardElement.querySelector('.popup__avatar').src = card.author.avatar;

		return cardElement;
	};

	window.card = createCards;
})();