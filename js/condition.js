'use strict';

(function () {
	var CLICK_LEFT = 1;
	var ENTER_KEY = 'Enter';

	var mapFilter = document.querySelector('.map__filter');
	var map = document.querySelector('.map');
	var pinMain = map.querySelector('.map__pin--main');
	var adForm = document.querySelector('.ad-form');
	var fieldsetsForm = adForm.querySelectorAll('fieldset');
	var mapFilters = map.querySelector('.map__filters');
	var mapFeatures = mapFilters.querySelectorAll('.map__feature'); 
	var selectsFilters = mapFilters.querySelectorAll('select');
	var fieldsetFilters = mapFilters.querySelector('fieldset');

	// Блокировка input-ов на начальной загрузке для неактивного состояния
	var disabledFunctions = function () {	
		// Добавление атрибутов disabled у adForm в неактивное состояние
		for (var i = 0; i < fieldsetsForm.length; i++) {
			fieldsetsForm[i].setAttribute('disabled', 'disabled');
		}	
		
		// Добавление атрибутов disabled у mapFilters в неактивное состояние
		for (var j = 0; j < selectsFilters.length; j++) {
			selectsFilters[j].setAttribute('disabled', 'disabled');
			selectsFilters[j].style.cursor = 'default';
		}

		for (var h = 0; h < mapFeatures.length; h++) {
			mapFeatures[h].style.cursor = 'default';
		}

		fieldsetFilters.setAttribute('disabled', 'disabled');
	};

	disabledFunctions();

	// Активация input-ов, удаление лишних классов и запрос от сервера на данные для активного состояния
	var activationFunctions = function () {
		for (var i = 0; i < fieldsetsForm.length; i++) {
			fieldsetsForm[i].removeAttribute('disabled');
		}

		for (var j = 0; j < selectsFilters.length; j++) {
			selectsFilters[j].removeAttribute('disabled');
			selectsFilters[j].style.cursor = 'pointer';
		}

		for (var h = 0; h < mapFeatures.length; h++) {
			mapFeatures[h].style.cursor = 'pointer';
		}

		fieldsetFilters.removeAttribute('disabled');

		map.classList.remove('map--faded');
		adForm.classList.remove('ad-form--disabled');

		window.backend.load(window.filter.getData, window.error);		
	};

	// Активация функции addActiveState и visible (показ pins в активном состоянии через mousedown)
	var onMousedownActivation = function (evt) {
		evt.preventDefault();
			
		if (evt.which === CLICK_LEFT) { // && map.classList.contains('map--faded')
			activationFunctions();	

			pinMain.removeEventListener('mousedown', onMousedownActivation);
			pinMain.removeEventListener('keydown', onKeydownActivation);
		}
	};	

	pinMain.addEventListener('mousedown', onMousedownActivation);

	// Активация функции addActiveState и visible (показ pins в активном состоянии через keydown)
	var onKeydownActivation = function (evt) {
		if (evt.key === ENTER_KEY) {
			activationFunctions();	

			pinMain.removeEventListener('keydown', onKeydownActivation);
			pinMain.removeEventListener('mousedown', onMousedownActivation);
		}
	};	
	
	pinMain.addEventListener('keydown', onKeydownActivation);

	// Блокировка input-ов после отправки (send.js) для неактивного состояния
	var disabledFunctionsForSend = function () {
		disabledFunctions();

		map.classList.add('map--faded');
		adForm.classList.add('ad-form--disabled');

		pinMain.addEventListener('mousedown', onMousedownActivation);
		pinMain.addEventListener('keydown', onKeydownActivation);
	};

	window.condition = {
		onMousedownActivation: onMousedownActivation,
		onKeydownActivation: onKeydownActivation,
		disabledFunctionsForSend: disabledFunctionsForSend
	};
})();
