'use strict';

(function () {
	var valueToTypeHousing = {
		'flat': 'Квартира',
		'bungalow': 'Бунгало',
		'house': 'Дом',
		'palace': 'Дворец'
	};

	var serviceToClassName = {
		'wifi': 'popup__feature--wifi',
		'dishwasher': 'popup__feature--dishwasher',
		'parking': 'popup__feature--parking',
		'washer': 'popup__feature--washer',
		'elevator': 'popup__feature--elevator',
		'conditioner': 'popup__feature--conditioner'
	};

	var mapCard = document.querySelector('#card')
	.content.querySelector('.map__card');

	// Функция с заполнением данных в элементы cards
	var fillingDataCards = function (card) {
		var cardElement = mapCard.cloneNode(true);

		var typeCard = cardElement.querySelector('.popup__type');
		var typeArray = card.offer.type;

		var feature = cardElement.querySelectorAll('.popup__feature');

		var pictures = cardElement.querySelector('.popup__photos');
	  	var picture = pictures.querySelector('.popup__photo');
	  	var pictureAll = pictures.querySelectorAll('.popup__photo');

		// Выводит заголовок объявления
		cardElement.querySelector('.popup__title').textContent = card.offer.title;

		// Выводит адрес
		cardElement.querySelector('.popup__text--address').textContent = card.offer.address; 

		// Выводит цену
		cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

		// Выводит тип жилья 	
		typeCard.textContent = valueToTypeHousing[typeArray];

		// Выводит количество комнат и гостей
		cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms
		+ ' комнат-(ы, а) для ' + card.offer.guests + ' гостей';

		// Выводит время заезда и выезда
		cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' 
		+ card.offer.checkin + ' выезд до ' + card.offer.checkout;
		
		// Выводит доступные удобства
		for (var i = 0; i < card.offer.features.length; i++) {
			var cardFeature = card.offer.features[i];

			cardElement.querySelector('.' + serviceToClassName[cardFeature]).textContent = cardFeature;
		}

		// Удаление ненужных удобств (feature)
		for (var j = 0; j < feature.length; j++) {
			if (feature[j].textContent === '') {	
				feature[j].remove();
			}
		}

		// Выводит описание недвижимости
		cardElement.querySelector('.popup__description').textContent = card.offer.description;
		
		// Выводит фотографии
	  	var fragment = document.createDocumentFragment();

		for (var с = 0; с < card.offer.photos.length; с++) {
			var photo = picture.cloneNode(true);
			photo.src = card.offer.photos[с];
			fragment.appendChild(photo);	
		}

		// Удаление фото без ссылки
		pictureAll[0].remove();

		pictures.appendChild(fragment);		
			
		// Выводит аватарку 
		cardElement.querySelector('.popup__avatar').src = card.author.avatar;

		return cardElement;
	};

	window.card = fillingDataCards;
})();