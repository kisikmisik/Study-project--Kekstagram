(function() {

var commentInput = document.querySelector('.text__description');
var hashInput = document.querySelector('.text__hashtags');
var inputValue = hashInput.value;
var inputPattern = document.querySelector('.text__hashtags').pattern;
var patHtml = '[&#x23;]{1}[A-Za-zА-Яа-яЁё]{1,19}';

var getInputValidity = function () {

  var hashArray = document.querySelector('.text__hashtags').value.split(" ");
  if (hashArray.length === 0) {
    document.querySelector('.text__hashtags').removeAttribute('pattern');
  }
  if (hashArray.length === 1) {
    document.querySelector('.text__hashtags').pattern = patHtml;
  }
  if (hashArray.length === 2) {
    document.querySelector('.text__hashtags').pattern = patHtml + ' ' + patHtml;
  }
  if (hashArray.length === 3) {
    document.querySelector('.text__hashtags').pattern = patHtml + ' ' + patHtml + ' ' + patHtml;
  }
  if (hashArray.length === 4) {
    document.querySelector('.text__hashtags').pattern =
    patHtml + ' ' + patHtml + ' ' + patHtml + ' ' + patHtml;
  }
  if (hashArray.length === 5) {
    document.querySelector('.text__hashtags').pattern =
    patHtml + ' ' + patHtml + ' ' + patHtml + ' ' + patHtml + ' ' + patHtml;
  }

  var isSame = function (element, index, array) {
    return (element === hashArray[index + 1] || element === hashArray[index + 2] || element === hashArray[index + 3]
      || element === hashArray[index + 4]);
  }

  if (hashArray.some(isSame)) {
    if (hashArray.length > 1) {
      hashInput.setCustomValidity("Нельзя указывать одинаковые хештеги");
    }
  } else {
    hashInput.setCustomValidity("");
  }

}

hashInput.addEventListener('input', function () {
  getInputValidity();
});

hashInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

commentInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

var successTemplate = document.querySelector('#success').content.querySelector('.success');
var errorTemplate = document.querySelector('#error').content.querySelector('.error');
var submitButton = document.querySelector('.img-upload__submit');
var main = document.querySelector('main');

var submitClickHandler = function (evt) {
  if (hashInput.validity.valid && commentInput.validity.valid) {
    window.preview.editPopup.classList.add('hidden');
    hashInput.value = '';
    commentInput.value = '';
    window.preview.getDefault();
    var successAlert = successTemplate.cloneNode(true);
    main.appendChild(successAlert);

    var successButton = successAlert.querySelector('.success__button');
    var success = successAlert;
    var successPopup = successAlert.querySelector('.success__inner');
    var successTitle = successAlert.querySelector('.success__title');

    successButton.addEventListener('click', function (evt) {
      success.style = 'visibility: hidden';
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.gallery.ESC_KEYCODE) {
        success.style = 'visibility: hidden';
      };
    });

    success.addEventListener('click', function (evt) {
      if (evt.target !== successPopup && evt.target !== successTitle) {
      success.style = 'visibility: hidden';
      };
    });
  }
};

var errorHandler = function () {
  if (hashInput.validity.valid && commentInput.validity.valid) {
    window.preview.editPopup.classList.add('hidden');
    hashInput.value = '';
    commentInput.value = '';
    window.preview.getDefault();
    var errorAlert = errorTemplate.cloneNode(true);
    main.appendChild(errorAlert);

    var errorButton = errorAlert.querySelector('.error__button');
    var error = errorAlert;
    var errorPopup = errorAlert.querySelector('.error__inner');
    var errorTitle = errorAlert.querySelector('.error__title');

    errorButton.addEventListener('click', function (evt) {
      error.style = 'visibility: hidden';
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.gallery.ESC_KEYCODE) {
        error.style = 'visibility: hidden';
      };
    });

    error.addEventListener('click', function (evt) {
      if (evt.target !== errorPopup && evt.target !== errorTitle) {
      error.style = 'visibility: hidden';
      };
    });
  }
};

var form = document.querySelector('.img-upload__form');

form.addEventListener('submit', function (evt) {
  window.backend.save(new FormData(form), function (response) {
    submitClickHandler();
  }, errorHandler);
  evt.preventDefault();
});

})();
