'use strict';

(function () {
	var ECS_KEY = 'Escape';

	var error = document.querySelector('#error')
	.content.querySelector('.error');
	var waiting = document.querySelector('#waiting')
	.content.querySelector('.waiting')
	var errorButton = error.querySelector('.error__button');
	var main = document.querySelector('main');

	var onKeydownPopupError = function (evt) {
		if (evt.key === ECS_KEY) { 
			error.remove();

			document.removeEventListener('keydown', onKeydownPopupError);	
			document.removeEventListener('click', onClickPopupError);	
		}
	};

	var onClickPopupError = function (evt) {
		error.remove();

		document.removeEventListener('click', onClickPopupError);	
		document.removeEventListener('keydown', onKeydownPopupError);	
	};

	var creaturePopupError = function (err) {
		var p = document.createElement('p');
		var text = error.querySelectorAll('p');

		waiting.remove(); // удаляет ожидание отправки

		if (text.length > 1) { // удаляет накопление текста
			text[1].remove();
		}

		p.style.fontSize = '30px';
		p.style.color = 'white';
		p.textContent = err;
		error.insertBefore(p, errorButton);

		main.appendChild(error);

		errorButton.addEventListener('click', onClickPopupError);
		error.addEventListener('click', onClickPopupError);
		document.addEventListener('keydown', onKeydownPopupError);					
	};

	window.error = creaturePopupError;
})();