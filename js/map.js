'use strict';

(function () {
	var pinsContainer = document.querySelector('.map__pins');
	var arrayCards = [];
	var arrayPins = [];
 
	// Функция для заполнения данных в arrayCards и arrayPins
	var onCreateCardsAndPins = function (data) {
		var createCards = window.card;
		var createPins = window.pin;
		
		for (var i = 0; i < data.length; i++) {
			arrayPins.push(createPins(data[i]));	
			arrayCards.push(createCards(data[i]));
		}

		onRenderingPins();
		window.opencards();
	};

	// Функция для отрисовки pins
	var onRenderingPins = function () {
		var fragment = document.createDocumentFragment();

		for (var i = 0; i < arrayPins.length; i++) {
			fragment.appendChild(arrayPins[i]);
		}

		pinsContainer.appendChild(fragment);
	};

	//----------------------------------------------------------------------------------------------------

	// var error = document.querySelector('#error')
	// .content.querySelector('.error');
	// var errorButton = error.querySelector('.error__button');
	// var main = document.querySelector('main');

	// var onKeydownPopupError = function (evt) {
	// 	if (evt.key === ECS_KEY) { 
	// 		error.remove();
	// 	}

	// 	errorButton.removeEventListener('click', onClickPopupError);
	// 	document.removeEventListener('keydown', onKeydownPopupError);	
	// 	document.removeEventListener('click', onClickPopupError);	
	// };

	// var onClickPopupError = function () {
	// 	error.remove();

	// 	errorButton.removeEventListener('click', onClickPopupError);
	// 	document.removeEventListener('click', onClickPopupError);	
	// 	document.removeEventListener('keydown', onKeydownPopupError);	
	// };

	// var onError = function (err) {
	// 	main.appendChild(error);

	// 	console.log(err);

	// 	errorButton.addEventListener('click', onClickPopupError);
	// 	document.addEventListener('keydown', onKeydownPopupError);		
	// 	document.addEventListener('click', onClickPopupError);	
	// };

    //----------------------------------------------------------------------------------------------------

	// // AJAX отправка данных
	// var form = document.querySelector('.ad-form');
	// var formReset = document.querySelector('.ad-form__reset');
	// var success = document.querySelector('#success')
	// .content.querySelector('.success');

	// var getClean = function () {
	// 	window.condition.shutdownMapAndForm();

	// 	form.reset(); // чистит адрес (исправить)

	// 	var pinMain = document.querySelector('.map__pin--main');
	// 	pinMain.style.left = 570 + 'px';
	// 	pinMain.style.top = 375 + 'px';

	// 	window.address(); 
	// 	// не работает дополнительное прибавление координат
	// 	// не добавлено обнуление фильтров

	// 	var card = document.querySelector('.map__card');
	// 	if (card) {
	// 		card.remove();
	// 	}

	// 	var allPins = document.querySelectorAll('.map__pin');
	// 	for (var i = 1; i < allPins.length; i++) {
	// 		allPins[i].remove();
	// 	}
	// };

	// var onKeydownPopupSend = function (evtKey) {
	// 	if (evtKey.key === ECS_KEY) { 
	// 		success.remove();
	// 	}

	// 	document.removeEventListener('keydown', onKeydownPopupSend);	
	// 	document.removeEventListener('click', onClickPopupSend);	
	// };

	// var onClickPopupSend = function () {
	// 	success.remove();

	// 	document.removeEventListener('click', onClickPopupSend);	
	// 	document.removeEventListener('keydown', onKeydownPopupSend);	
	// };

	// form.addEventListener('submit', function (evt) {
	// 	window.backend.publish(new FormData(form), function (response) {
	// 		main.appendChild(success);

	// 		document.addEventListener('keydown', onKeydownPopupSend);		
	// 		document.addEventListener('click', onClickPopupSend);	
	// 	}, onError);

	// 	getClean();

	// 	evt.preventDefault();
	// });

	// formReset.addEventListener('click', function () {
	// 	getClean();
	// });
	
	window.map = {
		arrayCards: arrayCards,
		arrayPins: arrayPins,
		onCreateCardsAndPins: onCreateCardsAndPins,
	};
})();
