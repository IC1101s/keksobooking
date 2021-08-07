'use strict';

(function () {
	var URL_GET = 'https://javascript.pages.academy/keksobooking/data'; // https://21.javascript.pages.academy/keksobooking/data
	var URL_POST = 'https://javascript.pages.academy/keksobooking';
	var TIMEOUT_IN_MS = 10000;
	var STATUS_OK = 200;

	window.backend = {
		load: function (onLoad, onError) {
			var xhr = new XMLHttpRequest();
			
			xhr.responseType = 'json';

			xhr.addEventListener('load', function () {
				if (xhr.status === STATUS_OK) {
					onLoad(xhr.response);
				} else {
					onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
				}	
			});

			xhr.addEventListener('error', function () {
				onError('Произошла ошибка соединения, проверьте подключение к интернету');
			});

			xhr.addEventListener('timeout', function () {
				onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
			});

			xhr.timeout = TIMEOUT_IN_MS;

			xhr.open('GET', URL_GET);

			xhr.send();	
		},

		publish: function (data, onPublish, onError) {
			var xhr = new XMLHttpRequest();

			xhr.responseType = 'json';

			xhr.addEventListener('load', function () {
				if (xhr.status === STATUS_OK) {
					onPublish(xhr.response);
				} else {
					onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
				}	
			});

			xhr.addEventListener('error', function () {
				onError('Произошла ошибка соединения, проверьте подключение к интернету');
			});

			xhr.addEventListener('timeout', function () {
				onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
			});

			xhr.timeout = TIMEOUT_IN_MS;

			xhr.open('POST', URL_POST);

			xhr.send(data);
		}
	};
})();