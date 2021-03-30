'use strict';

(function () {
	var FILE_TYPES = ['jpg', 'jpeg', 'png'];

	var filePreview = document.querySelector('.ad-form__field input[type=file]');
	var preview = document.querySelector('.ad-form-header__preview img');
	var filePhotoHouse = document.querySelector('.ad-form__upload input[type=file]');
	var photoHouse = document.querySelector('.ad-form__photo');

	var img = document.createElement('img');
	img.alt = 'Фотография жилья';
	img.style.width = '70px';
	img.style.height = '70px';

	var testFile = function (fileInput, image, bool) {
		fileInput.addEventListener('change', function () {
			var file = fileInput.files[0];
			var fileName = file.name.toLowerCase();

			var matches = FILE_TYPES.some(function (it) {
				return fileName.endsWith(it);
			});

			if (matches) {
				var reader = new FileReader();

				if (bool) {
					image.appendChild(img);				
				}

				reader.addEventListener('load', function () {
					if (bool) {
						var photoHouseImg = image.querySelector('img');
						photoHouseImg.src = reader.result;
					} else {
						image.src = reader.result;
					}			
				});

				reader.readAsDataURL(file);				
			}
		});
	};

	testFile(filePreview, preview);
	testFile(filePhotoHouse, photoHouse, true);
})();