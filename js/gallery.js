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

var pictureCancel = document.querySelector('.big-picture__cancel');
var bigPicSrc = document.querySelector('.big-picture__img img');
var bigPicture = document.querySelector('.big-picture');

var getFullPic = function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    bigPicSrc.src = target.src;
    bigPicture.classList.remove('hidden');
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === gallery.ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  });
};

var successHandler = function (images) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    fragment.appendChild(renderImage(images[i]));
  }
  pictures.appendChild(fragment);

  document.addEventListener('click', function (evt) {
    getFullPic(evt);
  });

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

window.backend.load(successHandler, errorHandler);

pictureCancel.addEventListener('click', function (evt) {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  var target = evt.target;
  var picturesSmall = document.querySelectorAll('.picture');

  for (var i = 0; i < picturesSmall.length; i++) {
    if (target === picturesSmall[i]) {
      if (evt.keyCode === ENTER_KEYCODE) {
        bigPicture.classList.remove('hidden');
        bigPicSrc.src = target.querySelector('.picture__img').src;
      }
    }
  }
});

window.gallery = {
  ESC_KEYCODE: ESC_KEYCODE,
  ENTER_KEYCODE: ENTER_KEYCODE
};

})();




















