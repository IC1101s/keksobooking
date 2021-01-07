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
	var selectsFilters = mapFilters.querySelectorAll('select');
	var fieldsetFilters = mapFilters.querySelector('fieldset');

	var blockMapAndForm = function () {	
		// Добавление атрибутов disabled у adForm в неактивное состояние
		for (var i = 0; i < fieldsetsForm.length; i++) {
			fieldsetsForm[i].setAttribute('disabled', 'disabled');
		}	
		
		// Добавление атрибутов disabled у mapFilters в неактивное состояние
		for (var j = 0; j < selectsFilters.length; j++) {
			selectsFilters[j].setAttribute('disabled', 'disabled');
		}

		fieldsetFilters.setAttribute('disabled', 'disabled');
	};

	blockMapAndForm();

	// Удаление атрибутов disabled и лишних классов для активного состояния
	var activationMapAndForm = function () {
		for (var i = 0; i < fieldsetsForm.length; i++) {
			fieldsetsForm[i].removeAttribute('disabled');
		}

		for (var j = 0; j < selectsFilters.length; j++) {
			selectsFilters[j].removeAttribute('disabled');
		}

		fieldsetFilters.removeAttribute('disabled');

		map.classList.remove('map--faded');
		adForm.classList.remove('ad-form--disabled');

		window.backend.load(window.map.getData, window.error);		
	};

	var shutdownMapAndForm = function () {
		blockMapAndForm();
		map.classList.add('map--faded');
		adForm.classList.add('ad-form--disabled');
	};

	// Активация функции addActiveState и visible (показ pins в активном состоянии через mousedown)
	pinMain.addEventListener('mousedown', function (evt) {
		evt.preventDefault();
		
		if (evt.which === CLICK_LEFT && map.classList.contains('map--faded')) {
			activationMapAndForm();	
		}

		window.address();
	}); 

	// Активация функции addActiveState и visible (показ pins в активном состоянии через keydown)
	pinMain.addEventListener('keydown', function (evt) {
		if (evt.key === ENTER_KEY && map.classList.contains('map--faded')) {
			activationMapAndForm();	
		}
	});

	window.condition = {
		shutdownMapAndForm: shutdownMapAndForm
	};
})();
