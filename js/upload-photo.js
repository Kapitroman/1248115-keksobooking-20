'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserAccomoditions = document.querySelector('.ad-form__input');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  function uploadPhoto(evt, preview) {
    if (!preview) {
      if (adFormPhoto.firstElementChild) {
        preview = adFormPhoto.firstElementChild;
      } else {
        preview = document.createElement('img');
        preview.style.maxWidth = '290px';
        preview.style.maxHeight = '220px';
        adFormPhoto.appendChild(preview);
      }
    }

    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  fileChooserAvatar.addEventListener('change', function (evt) {
    uploadPhoto(evt, previewAvatar);
  });

  fileChooserAccomoditions.addEventListener('change', function (evt) {
    uploadPhoto(evt);
  });

})();
