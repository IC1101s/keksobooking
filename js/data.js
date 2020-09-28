'use strict';

(function () {
	// Функция с данными и заполением их в массив
	var generateData = function () {
		var advertising = [];

		for (var i = 1; i <= 8; i++) {
			advertising.push({
				author: {
					avatar: 'img/avatars/user0' + i + '.png'
				},

				offer: {
					title: 'Квартира - "Анна"',
					address: 'location.x, location.y', // в след. заданиях доделать
					price: window.random(1000, 10000),
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
					x: window.random(200, 1000),
					y: window.random(130, 630)
				}
			});
		}

		return advertising;
	};

	window.data = generateData;
})();