'use strict';

(function () {
	var housingType = document.querySelector('#housing-type');
	var popupType = document.querySelector('.popup__type');

/*	var valueToTypeHousing = {
		'flat': 'Квартира',
		'bungalo': 'Бунгало',
		'house': 'Дом',
		'palace': 'Дворец'
	};*/
	
	var newData = [];

	var test = function (data) {
		newData = data;
	}
	
	var getFiltration = function () {

		var typeChange = newData.filter(function (newData) {
			if (housingType.value === 'flat') {
				return newData.offer.type === 'flat';
			} else if (housingType.value === 'bungalo')	{
				return newData.offer.type === 'bungalo';
			} else if (housingType.value === 'house')	{
				return newData.offer.type === 'house';
			} else if (housingType.value === 'palace')	{
				return newData.offer.type === 'palace';
			}

			return newData.offer.type;
		});

		window.map.onCreateCardsAndPins(typeChange);	

		window.map.onRenderingPins();

		window.opencards();
	}

	var del = function () {
		var allPins = document.querySelectorAll('.map__pin');

		console.log(allPins, 'del');
		for (var i = 1; i < allPins.length; i++) {
			allPins[i].remove();
		}	
	};
	
	housingType.addEventListener('change', del);
	housingType.addEventListener('change', getFiltration);
	
	// var test2 = function (pins) {
	// 	var newArrayPins = pins.filter(function (pins, i) {
	// 		if (i < 5) {		
	// 			return pins;
	// 		}	
	// 	});						

	// 	window.filter2 = newArrayPins;
	// };

	window.filter = {
		test: test,
		getFiltration: getFiltration
	};
})();