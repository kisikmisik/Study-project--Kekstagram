'use strict';
(function () {

var fragment = document.createDocumentFragment();
var photoNumber = 1;
var bigPicture = document.querySelector('.big-picture');
var posts = [];
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var renderImage = function (image) {

  var similarImageTemplate = document.querySelector('#picture').content;
  var imageElement = similarImageTemplate.cloneNode(true);

  imageElement.querySelector('.picture__img').src = image.url;
  imageElement.querySelector('.picture__likes').textContent = image.likes;
  imageElement.querySelector('.picture__comments').textContent = image.comments.length;
  return imageElement;
};

var successHandler = function (images) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 25; i++) {
    fragment.appendChild(renderImage(images[i]));
  }
  pictures.appendChild(fragment);
};

var errorHandler = function (errorMessage) {
  var errorTemplate = document.querySelector('#error').content;
  var errorElement = errorTemplate.cloneNode(true);
  var errorTryAgain = errorElement.querySelector('.error__button:nth-child(1)');
  var errorTryNewPhoto = errorElement.querySelector('.error__button:nth-child(2)');

  errorElement.querySelector('.error__title').textContent = 'Ошибка загрузки фотографий';
  errorTryNewPhoto.style = 'display: none';
  document.querySelector('main').appendChild(errorElement);

  errorTryAgain.addEventListener('click', function () {
    location.reload();
  });
};

window.load(successHandler, errorHandler);

window.gallery = {
  ESC_KEYCODE: ESC_KEYCODE,
  ENTER_KEYCODE: ENTER_KEYCODE
};

})();




















