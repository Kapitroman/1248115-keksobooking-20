'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserAccomoditions = document.querySelector('.ad-form__input');
  var adFormFoto = document.querySelector('.ad-form__photo');

  function uploadFoto(evt, preview) {
    if (preview === undefined) {
      preview = document.createElement('img');
      adFormFoto.appendChild(preview);
    }

    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
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
    uploadFoto(evt, previewAvatar);
  });

  fileChooserAccomoditions.addEventListener('change', uploadFoto);

})();
