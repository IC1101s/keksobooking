'use strict';

var map = document.querySelector('.map');

// Добавление атрибутов disabled в неактивное состояние
var adForm = document.querySelector('.ad-form');
var fieldsetsForm = adForm.querySelectorAll('fieldset');
for (var q = 0; q < fieldsetsForm.length; q++) {
	fieldsetsForm[q].setAttribute('disabled', 'disabled');
}

// Добавление атрибутов disabled в неактивное состояние
var mapFilters = map.querySelector('.map__filters');
var selectsFilters = mapFilters.querySelectorAll('select');
var fieldsetFilters = mapFilters.querySelector('fieldset');

for (var z = 0; z < selectsFilters.length; z++) {
	selectsFilters[z].setAttribute('disabled', 'disabled');
}

fieldsetFilters.setAttribute('disabled', 'disabled');

// Координаты главной метки
var pinMain = map.querySelector('.map__pin--main');
var addressForm = document.querySelector('#address');

var coordX = pinMain.style.left;
var valueCoordX = coordX.slice(0, coordX.length - 2);
var coordY = pinMain.style.top;
var valueCoordY = coordY.slice(0, coordX.length - 2);

addressForm.value = valueCoordX + ', ' + valueCoordY;

// Удаление атрибутов disabled в активном состоянии и прибавление пикселей в к координате
var CLICK_LEFT = 1;
var ENTER_KEY = 'Enter';

var addActive = function () {
	for (var q = 0; q < fieldsetsForm.length; q++) {
		fieldsetsForm[q].removeAttribute('disabled');
	}

	for (var z = 0; z < selectsFilters.length; z++) {
		selectsFilters[z].removeAttribute('disabled');
	}
	fieldsetFilters.removeAttribute('disabled');

	map.classList.remove('map--faded');
	adForm.classList.remove('ad-form--disabled');

	addressForm.value = valueCoordX + ', ' + (Number(valueCoordY) + 53);

	renderingPins();
};

// Удаление атрибутов disabled в активном состоянии через mousedown
pinMain.addEventListener('mousedown', function (evt) {
	if (evt.which === CLICK_LEFT) {
		addActive();
	}
}); 

// Удаление атрибутов disabled в активном состоянии через keydown
pinMain.addEventListener('keydown', function (evt) {
	if (evt.key === ENTER_KEY) {
		addActive();
	}
});

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

// Функция с заполнением данных в template #pin
var mapPin = document.querySelector('#pin')
.content.querySelector('.map__pin');

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

// Функция c отрисовкой pins в pinsContainer
var pinsContainer = document.querySelector('.map__pins');

var renderingPins = function () {
	var pinsData = generateData();
	var fragment = document.createDocumentFragment();

	for (var j = 0; j < pinsData.length; j++) {
		fragment.appendChild(createPins(pinsData[j]));
	}

	pinsContainer.appendChild(fragment);

	// return pinsContainer;
	window.rendering = pinsContainer.querySelectorAll('.map__pin');
};

// Функция с заполнением данных в template #card
var mapCard = document.querySelector('#card')
.content.querySelector('.map__card');

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
var renderingCards = function (value) {
	var cardData = generateData();
	var fragment = document.createDocumentFragment();

	for (var f = 0; f < cardData.length; f++) {
		fragment.appendChild(createCard(cardData[f]));
	}

	map.insertBefore(fragment, filtersContainer);
};

// РАЗОБРАТЬСЯ
/*var mapPins = document.querySelectorAll('.map__pin');
var mapCards = document.querySelectorAll('.map__card');

console.log(mapCards);
console.log(mapPins);
*/

// var addClick = function (mapPin, mapCard) {
// 	mapPin.addEventListener('click', function () {
	
// 	});
// };

// for (var v = 0; v < window.rendering.length; v++) {
// 	addClick(window.rendering[v], renderingCards(v));
// }


// Удаление ненужных feature
var feature = document.querySelectorAll('.popup__feature');

for (var g = 0; g < feature.length; g++) {
	if (feature[g].textContent === '') {	
		feature[g].remove();
	}
}

// Валидация (комнат и гостей)
var roomNumber = document.querySelector('#room_number');
var capacityNumber = document.querySelector('#capacity');

var formSubmit = document.querySelector('.ad-form__submit');

var getRoomsValidity = function (evt) {
	if (roomNumber.value == 1 && capacityNumber.value > 1) {
		capacityNumber.setCustomValidity('Выберете не больше 1-ого гостя');
	} else if (roomNumber.value == 2 && capacityNumber.value > 2) {
		capacityNumber.setCustomValidity('Выберете не больше 2-ух гостей');
	} else if (roomNumber.value < 100 && capacityNumber.value == 0) {
		capacityNumber.setCustomValidity('Не для гостей - выбирается только на 100 комнат');
	} else if (roomNumber.value == 100 && capacityNumber.value > 0) {
		capacityNumber.setCustomValidity('Выберете - не для гостей');
	} else {
		capacityNumber.setCustomValidity('');
	}	
};

getRoomsValidity();

roomNumber.addEventListener('change', function () {
	getRoomsValidity();
});

capacityNumber.addEventListener('change', function () {
	getRoomsValidity();
});



