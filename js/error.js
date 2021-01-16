'use strict';

(function () {
	var ECS_KEY = 'Escape';

	var error = document.querySelector('#error')
	.content.querySelector('.error');
	var errorButton = error.querySelector('.error__button');
	var main = document.querySelector('main');

	var onKeydownPopupError = function (evt) {
		if (evt.key === ECS_KEY) { 
			error.remove();
		}

		document.removeEventListener('keydown', onKeydownPopupError);	
		document.removeEventListener('click', onClickPopupError);	
	};

	var onClickPopupError = function () {
		error.remove();

		document.removeEventListener('click', onClickPopupError);	
		document.removeEventListener('keydown', onKeydownPopupError);	
	};

	var creaturePopupError = function (err) {
		var p = document.createElement('p');

		p.style.fontSize = '30px';
		p.style.color = 'white';
		p.textContent = err;
		error.insertBefore(p, errorButton);

		main.appendChild(error);

		errorButton.addEventListener('click', onClickPopupError);
		document.addEventListener('click', onClickPopupError);
		document.addEventListener('keydown', onKeydownPopupError);					
	};

	window.error = creaturePopupError;
})();