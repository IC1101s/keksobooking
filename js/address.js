'use strict';

(function () {
	var ENTER_KEY = 'Enter';
	var PIN_WIDTH = 62;
  	var PIN_HEIGHT = 62;
  	var PIN_TIP = 22;
  	var CLICK_LEFT = 1;
	
	var pinMain = document.querySelector('.map__pin--main');
	var addressForm = document.querySelector('#address');
	var coordX = pinMain.style.left;	
	var coordY = pinMain.style.top;
	var valueCoordX = coordX.slice(0, coordX.length - 2);
	var valueCoordY = coordY.slice(0, coordX.length - 2);

	// Координаты главной метки
	var addressMain = {
		x: (Number(valueCoordX) + PIN_WIDTH / 2),
		y: (Number(valueCoordY) + PIN_HEIGHT / 2)
	};

	addressForm.value = addressMain.x + ', ' + addressMain.y;

	// Функция для однорозавого перехода координаты под острый конец
	var dragger = true;
	var getDragger = function () {
		if (dragger) {
			addressMain.y = (Number(valueCoordY) + PIN_HEIGHT / 2 + PIN_TIP);
			addressForm.value = addressMain.x + ', ' + addressMain.y;
			dragger = false;
		}
	};
	
	pinMain.addEventListener('keydown', function (evt) {
		if (evt.key === ENTER_KEY) {
			getDragger();
		}
	});

	var getMovingPin = function () {
		getDragger();

		var onMouseMove = function (moveEvt) {
			moveEvt.preventDefault();

			var coordNewX = pinMain.style.left;
			var coordNewY = pinMain.style.top;
					
			var valueNewCoordX = coordNewX.slice(0, coordNewX.length - 2);
			var valueNewCoordY = coordNewY.slice(0, coordNewY.length - 2);

			var addressMainNew = {
				x: (Number(valueNewCoordX) + PIN_WIDTH / 2),
				y: (Number(valueNewCoordY) + PIN_HEIGHT / 2) // пров. PIN_TIP
			};

			addressForm.value = addressMainNew.x + ', ' + addressMainNew.y;
		};

		var onMouseUp = function (upEvt) {
			upEvt.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};

	pinMain.addEventListener('mousedown', getMovingPin);

	// Сброс адреса до дефолта
	var resetAddress = function () {
		dragger = true;

		var newAddressMain = {
			x: (Number(valueCoordX) + PIN_WIDTH / 2),
			y: (Number(valueCoordY) + PIN_HEIGHT / 2)
		};

		pinMain.style.left = valueCoordX + 'px';
		pinMain.style.top = valueCoordY + 'px';

		addressForm.value = newAddressMain.x + ', ' + newAddressMain.y;
	};

	window.address = {
		getMovingPin: getMovingPin,
		resetAddress: resetAddress
	}
})();