'use strict';

(function () {
	var COORDINATES_QUANTITY = 2;

	var mapCard = document.querySelector('#card')
	.content.querySelector('.map__card');

	// Функция с заполнением данными в элементы cards
	var fillingDataCards = function (card) {
		var cardElement = mapCard.cloneNode(true);

		// Выводит заголовок объявления
		cardElement.querySelector('.popup__title').textContent = card.offer.title;

		// Выводит адрес
		for (var i = 0; i < COORDINATES_QUANTITY; i++) {
			cardElement.querySelector('.popup__text--address').textContent = card.offer.address; 
			// card.location.x + ' ' + card.location.y
		}

		// Выводит цену
		cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

		// Выводит тип жилья 
		var typeCard = cardElement.querySelector('.popup__type');
		var typeArray = card.offer.type;

		switch (typeArray) {
			case 'flat':
				typeCard.textContent = 'Квартира';
				break;
			case 'bungalo':
				typeCard.textContent = 'Бунгало';
				break;
			case 'house':
				typeCard.textContent = 'Дом';
				break;
			case 'palace':
				typeCard.textContent = 'Дворец';
				break;
			default: 
				typeCard.textContent = 'Не указано'
		}

		// Выводит количество комнат и гостей
		cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms
		+ ' комнаты для ' + card.offer.guests + ' гостей';

		// Выводит время заезда и выезда
		cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' 
		+ card.offer.checkin + ' выезд до ' + card.offer.checkout;
		
		// Выводит доступные удобства
		for (var j = 0; j < card.offer.features.length; j++) {
			var cardFeature = card.offer.features[j];

			switch (cardFeature) {
				case 'wifi':
					cardElement.querySelector('.popup__feature--wifi').textContent = cardFeature;
					break;
				case 'dishwasher':
					cardElement.querySelector('.popup__feature--dishwasher').textContent = cardFeature;
					break;
				case 'parking':
					cardElement.querySelector('.popup__feature--parking').textContent = cardFeature;
					break;
				case 'washer':
					cardElement.querySelector('.popup__feature--washer').textContent = cardFeature;
					break;
				case 'elevator':
					cardElement.querySelector('.popup__feature--elevator').textContent = cardFeature;
					break;
				case 'conditioner':
					cardElement.querySelector('.popup__feature--conditioner').textContent = cardFeature;
					break;
				default: 
					throw new Error('Неизвестная услуга ' + cardFeature);
			}		
		}

		// Выводит описание недвижимости
		cardElement.querySelector('.popup__description').textContent = card.offer.description;
		
		// Выводит фотографии
		var pictures = cardElement.querySelector('.popup__photos');
	  	var picture = cardElement.querySelector('.popup__photo');

	  	var fragment = document.createDocumentFragment();

		for (var d = 0; d < card.offer.photos.length; d++) {
			var photo = picture.cloneNode(true);
			photo.src = card.offer.photos[d];
			fragment.appendChild(photo);	
		}
		
		pictures.appendChild(fragment);	

		// Удаление фото без ссылки
		var popupPhoto = pictures.querySelectorAll('.popup__photo');
		popupPhoto[0].remove();
		
		// Выводит аватарку 
		cardElement.querySelector('.popup__avatar').src = card.author.avatar;

		return cardElement;
	};

	window.card = fillingDataCards;
})();