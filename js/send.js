'use strict';

(function () {
	var ECS_KEY = 'Escape';

	var form = document.querySelector('.ad-form');
	var formReset = document.querySelector('.ad-form__reset');
	var pinMain = document.querySelector('.map__pin--main');
	var main = document.querySelector('main');
	var success = document.querySelector('#success')
	.content.querySelector('.success');

	// Сброс данных
	var getClean = function () {
		window.condition.shutdownMapAndForm();

		form.reset(); // чистит адрес (исправить)

		pinMain.style.left = 570 + 'px';
		pinMain.style.top = 375 + 'px';

		window.address(); 
		// не работает дополнительное прибавление координат

		// не добавлено обнуление фильтров
		var card = document.querySelector('.map__card');
		if (card) {
			card.remove();
		}
		
		var allPins = document.querySelectorAll('.map__pin');
		for (var i = 1; i < allPins.length; i++) {
			allPins[i].remove();
		}
	};

	var onKeydownPopupSend = function (evt) {
		if (evt.key === ECS_KEY) { 
			success.remove();
		}

		document.removeEventListener('keydown', onKeydownPopupSend);	
		document.removeEventListener('click', onClickPopupSend);	
	};

	var onClickPopupSend = function () {
		success.remove();

		document.removeEventListener('click', onClickPopupSend);	
		document.removeEventListener('keydown', onKeydownPopupSend);	
	};

	// AJAX отправка данных и сброс
	form.addEventListener('submit', function (evt) {
		window.backend.publish(new FormData(form), function (response) {
			main.appendChild(success);

			document.addEventListener('keydown', onKeydownPopupSend);		
			document.addEventListener('click', onClickPopupSend);	

		}, window.error);

		getClean();

		evt.preventDefault();
	});

	// Сброс по кнопке reset
	formReset.addEventListener('click', function () {
		getClean();
	});
})();