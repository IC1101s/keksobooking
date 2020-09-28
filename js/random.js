'use strict';

(function () {
	// Рандомные числа
	var generateRandom = function (min, max) {
		min = Math.ceil(min);
	  	max = Math.floor(max);

		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	window.random = generateRandom;
})();

