'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Рандомные числа
var generateRandom = function (min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция с данными и заполением их в массив
var generateData = function () {
	var advertising = [];

	for (var i = 1; i <= 8; i++) {
		advertising.push({
			author: {
				avatar: 'img/avatars/user0' + i + '.png'
			},

			offer: {
				title: 'Москва',
				address: 'location.x, location.y', // в след. заданиях доделать
				price: generateRandom(1000, 10000),
				type: ['palace', 'flat', 'house', 'bungalo'], 
				rooms: 3,
				guests: 6,
				checkin: ['12:00', '13:00', '14:00'], 
				checkout: ['12:00','13:00', '14:00'],
				features:  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], // массив строк случайной длины
				description: 'Комфортабельный отель. Наши номера лучше всех, приходите!',
				photos: [ // массив строк случайной длины
					'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
					'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
					'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
				]  
			},

			location: {
				x: generateRandom(200, 1000),
				y: generateRandom(130, 630)
			}
		});
	}

	return advertising;
};

var mapPin = document.querySelector('#pin')
.content.querySelector('.map__pin');

// Функция с заполнением данных в template #pin
var createPins = function (pin) {
	var pinElement = mapPin.cloneNode(true);
	var pinElementImg = pinElement.querySelector('img');
	// var coordinates = pin.offer.address.split(', ');

	pinElement.style.left = pin.location.x + 'px';
	pinElement.style.top = pin.location.y + 'px';
	pinElementImg.src = pin.author.avatar;
	pinElementImg.alt = pin.offer.title;

	return pinElement;
};

var pinsContainer = document.querySelector('.map__pins');

// Функция c отрисовкой pins в pinsContainer
var renderingPins = function () {
	var pinsData = generateData();
	var fragment = document.createDocumentFragment();

	for (var j = 0; j < pinsData.length; j++) {
		fragment.appendChild(createPins(pinsData[j]));
	}

	pinsContainer.appendChild(fragment);

	return pinsContainer;
};

renderingPins();

var mapCard = document.querySelector('#card')
.content.querySelector('.map__card');

// Функция с заполнением данных в template #card
var createCard = function (card) {
	var cardElement = mapCard.cloneNode(true);

	//////
	cardElement.querySelector('.popup__title').textContent = card.offer.title;

	//////
	for (var r = 0; r < 2; r++) {
		cardElement.querySelector('.popup__text--address').textContent = card.location.x + ' ' + card.location.y;
	}

	//////
	cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

	//////
	var typeCard = cardElement.querySelector('.popup__type');
	var typeArray = card.offer.type[generateRandom(0, card.offer.type.length - 1)];

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
	+ card.offer.checkin[generateRandom(0, 2)] + ' выезд до ' + card.offer.checkout[generateRandom(0, 2)];
	
	//////
	for (var b = 0; b < generateRandom(1, card.offer.features.length); b++) {
		var cardFeature = card.offer.features[b];		

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

var filtersContainer = document.querySelector('.map__filters-container');

// Функция c отрисовкой cards в map
var renderingCards = function () {
	var cardData = generateData();
	var fragment = document.createDocumentFragment();

	for (var f = 0; f < cardData.length; f++) {
		fragment.appendChild(createCard(cardData[f]));
	}

	map.insertBefore(fragment, filtersContainer);
};

renderingCards();

var feature = document.querySelectorAll('.popup__feature');

// Удаление ненужных feature
for (var g = 0; g < feature.length; g++) {
	if (feature[g].textContent === '') {	
		feature[g].remove();
	}
}