'use strict';

(function () {
	var PIN_MAX_TOP = 130;
	var PIN_MAX_BOTTOM = 630;
	var PIN_MAX_LEFT = 0;
	var PIN_MAX_RIGHT = 1200;
	var PIN_WIDTH = 62;
  	var PIN_TIP = 22;
  	var CLICK_LEFT = 1;

	var pinMain = document.querySelector('.map__pin--main');

	pinMain.addEventListener('mousedown', function (evt) {
		if (evt.which === CLICK_LEFT) {
			evt.preventDefault();

			var startCoords = {
				x: evt.clientX,
				y: evt.clientY
			};

			var onMouseMove = function (moveEvt) {
				moveEvt.preventDefault();

				var shift = {
					x: startCoords.x - moveEvt.clientX,
					y: startCoords.y - moveEvt.clientY
				};

				startCoords = {
					x: moveEvt.clientX,
					y: moveEvt.clientY
				};

				// Перемещение метки с ограничениями по горизонтали
				if (pinMain.offsetLeft - shift.x <= PIN_MAX_LEFT - PIN_WIDTH / 2) {
					pinMain.style.left = PIN_MAX_LEFT - PIN_WIDTH / 2 + 'px';
				} else if (pinMain.offsetLeft - shift.x >= PIN_MAX_RIGHT - PIN_WIDTH / 2) {
					pinMain.style.left = PIN_MAX_RIGHT - PIN_WIDTH / 2 + 'px';
				} else {
					pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
				}

				// Перемещение метки с ограничениями по вертикали
				if (pinMain.offsetTop - shift.y <= PIN_MAX_TOP) {
					pinMain.style.top = PIN_MAX_TOP + 'px';
				} else if (pinMain.offsetTop - shift.y >= PIN_MAX_BOTTOM - PIN_TIP) {
					pinMain.style.top = PIN_MAX_BOTTOM - PIN_TIP + 'px';
				} else {
					pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
				}
			};

			var onMouseUp = function (upEvt) {
				upEvt.preventDefault();

				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);
			};

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		}
	}); 
})();