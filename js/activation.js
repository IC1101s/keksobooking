'use strict';

(function () {
	var CLICK_LEFT = 1;
	var ENTER_KEY = 'Enter';

	var map = document.querySelector('.map');

	// Добавление атрибутов disabled в неактивное состояние
	var adForm = document.querySelector('.ad-form');
	var fieldsetsForm = adForm.querySelectorAll('fieldset');
	for (var i = 0; i < fieldsetsForm.length; i++) {
		fieldsetsForm[i].setAttribute('disabled', 'disabled');
	}

	// Добавление атрибутов disabled в неактивное состояние
	var mapFilters = map.querySelector('.map__filters');
	var selectsFilters = mapFilters.querySelectorAll('select');
	var fieldsetFilters = mapFilters.querySelector('fieldset');

	for (var j = 0; j < selectsFilters.length; j++) {
		selectsFilters[j].setAttribute('disabled', 'disabled');
	}

	fieldsetFilters.setAttribute('disabled', 'disabled');

	// Удаление атрибутов disabled в активном состоянии и прибавление пикселей в к координате
	var pinMain = map.querySelector('.map__pin--main');

	var addActive = function () {
		for (var i = 0; i < fieldsetsForm.length; i++) {
			fieldsetsForm[i].removeAttribute('disabled');
		}

		for (var j = 0; j < selectsFilters.length; j++) {
			selectsFilters[j].removeAttribute('disabled');
		}
		fieldsetFilters.removeAttribute('disabled');

		map.classList.remove('map--faded');
		adForm.classList.remove('ad-form--disabled');
	};

	var visible = function () {	
		window.test2();	
		window.opencards();
	};

	// Удаление атрибутов disabled и показ pins в активном состоянии через mousedown
	pinMain.addEventListener('mousedown', function (evt) {
		evt.preventDefault();
		
		if (map.classList.contains('map--faded') && evt.which === CLICK_LEFT) {
			visible();
			addActive();
		}
	}); 

	// Удаление атрибутов disabled и показ pins в активном состоянии через keydown
	pinMain.addEventListener('keydown', function (evt) {
		if (map.classList.contains('map--faded') && evt.key === ENTER_KEY) {
			visible();
			addActive();
		}
	});
})();
