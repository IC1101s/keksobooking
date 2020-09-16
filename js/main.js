'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');



var generateRandom = function (min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};



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
				price: generateRandom(10000, 80000),
				type: 'palace', // flat, house, bungalo
				rooms: 3,
				guests: 6,
				checkin: '12:00', // 13:00 или 14:00
				checkout: '13:00', // 12:00 или 14:00
				features:  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], // массив строк случайной длины
				description: 'Наш номер лучше всех, приходите!',
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
	console.log(advertising);

	return advertising;
};



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



var pinsContainer = document.querySelector('.map__pins');

var rendering = function () {
	var pins = generateData();
	var fragment = document.createDocumentFragment();

	for (var j = 0; j < pins.length; j++) {
		fragment.appendChild(createPins(pins[j]));
	}

	pinsContainer.appendChild(fragment);

	return pinsContainer;
};

rendering();