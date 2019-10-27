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
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};


window.load(successHandler, errorHandler);

window.gallery = {
  ESC_KEYCODE: ESC_KEYCODE,
  ENTER_KEYCODE: ENTER_KEYCODE
};

})();




















