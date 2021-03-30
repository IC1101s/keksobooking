'use strict';

(function () {
	var ECS_KEY = 'Escape';

	var form = document.querySelector('.ad-form');
	var mapFilters = document.querySelector('.map__filters');
	var formReset = document.querySelector('.ad-form__reset');
	var pinMain = document.querySelector('.map__pin--main');
	var main = document.querySelector('main');	
	var success = document.querySelector('#success')
	.content.querySelector('.success');
	var waiting = document.querySelector('#waiting')
	.content.querySelector('.waiting')

	// Сброс данных          
	var getClean = function () {
		var card = document.querySelector('.map__card');
		var allPins = document.querySelectorAll('.map__pin');
		var preview = document.querySelector('.ad-form-header__preview img');
		var photoHouse = document.querySelector('.ad-form__photo img');

		window.condition.disabledFunctionsForSend();

		form.reset();

		mapFilters.reset(); // ставит фильтры по умолчанию

		preview.src = 'img/muffin-grey.svg';

		if (photoHouse) {
			photoHouse.remove();
		}

		window.address.resetAddress();
	
		if (card) {
			card.remove();
		}
		
		for (var i = 1; i < allPins.length; i++) {
			allPins[i].remove();
		}
	};

	var onKeydownPopupSend = function (evt) {
		if (evt.key === ECS_KEY) { 
			success.remove();

			document.removeEventListener('keydown', onKeydownPopupSend);	
			document.removeEventListener('click', onClickPopupSend);	
		}
	};

	var onClickPopupSend = function () {
		success.remove();

		document.removeEventListener('click', onClickPopupSend);	
		document.removeEventListener('keydown', onKeydownPopupSend);	
	};

	// AJAX отправка данных и сброс
	form.addEventListener('submit', function (evt) {
		evt.preventDefault();

		main.appendChild(waiting); // добляет ожидание при отправке на сервер

		window.backend.publish(new FormData(form), function (response) {
			waiting.remove();
			main.appendChild(success);

			document.addEventListener('keydown', onKeydownPopupSend);		
			document.addEventListener('click', onClickPopupSend);	

		}, window.error);

		getClean();
		window.validity();
	});

	// Сброс по кнопке reset
	formReset.addEventListener('click', function () {
		getClean();	
	});

	window.send = {
		getClean: getClean
	};
})();