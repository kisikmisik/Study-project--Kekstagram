(function () {

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
    return (element === hashArray[i]);
  }



  for (var i = 0; i < hashArray.length; i++) {
    if (hashArray.every(isSame)) {
      if (hashArray.length > 1) {
        hashInput.setCustomValidity("Нельзя указывать одинаковые хештеги");
      }
    } else {
      hashInput.setCustomValidity("");
    }
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
   evt.preventDefault();

  if (hashInput.validity.valid && commentInput.validity.valid) {
    editPopup.classList.add('hidden');
    var successAlert = successTemplate.cloneNode(true);
    main.appendChild(successAlert);

    var successButton = document.querySelector('.success__button');
    var success = document.querySelector('.success');

    successButton.addEventListener('click', function (evt) {
      success.parentNode.removeChild(success);
    });
  }
};

submitButton.addEventListener('click', function (evt) {
  submitClickHandler(evt);
});

})();
