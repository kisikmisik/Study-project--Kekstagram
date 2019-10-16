'use strict';

var fragment = document.createDocumentFragment();
var photoNumber = 1;

var bigPicture = document.querySelector('.big-picture');

//bigPicture.classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');


var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Кексичек',
  'Бубусенька',
  'Арнольдик',
  'Подкаблучник23',
  'ПисяТрусики',
  'нагибатор311'
];

var posts = [];
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');

var editPopup = document.querySelector('.img-upload__overlay');
var uploadButton = document.querySelector('#upload-file');
var closeEdit = document.querySelector('#upload-cancel');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var previewPic = document.querySelector('.img-upload__preview img');

var sliderPin = document.querySelector('.effect-level__pin');
var fullDoc = document.querySelector('body');
var sliderPinLine = document.querySelector('.effect-level__depth');
var slider = document.querySelector('.effect-level');

// Создает обьект комментария
var getComment = function () {
  var commentImg = 'img/avatar-' + Math.floor((Math.random() * 5) + 1) + '.svg';

  return {
    avatar: commentImg,
    message: comments[Math.floor(Math.random() * comments.length)],
    name: names[Math.floor(Math.random() * names.length)]
  }
};

// Создает обьект с данными о фото
var getPictureData = function () {
  var photoUrl = 'photos/' + photoNumber + '.jpg';

  var photoLikes = Math.floor((Math.random() * 235) + 15);

  return {
    url: photoUrl,
    description: '',
    likes: photoLikes,
    comments: getComment()
  }
};

// запихивает созданный обьект с данными о фото в верстку
var getHtml = function (data) {

    posts.push(getPictureData());

    var picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = data.url;
    picture.querySelector('.picture__likes').textContent = data.likes;
    picture.querySelector('.picture__comments').textContent = data.comments;

    pictures.appendChild(picture);

};

var getBigImageInfo = function (data) {
  var bigImage = bigPicture.querySelector('.big-picture__img img');
  var bigLikes = bigPicture.querySelector('.likes-count');
  var bigCommentsCount = bigPicture.querySelector('.comments-count');
  var bigCommentFirst = bigPicture.querySelector('.social__comment .social__picture');
  var bigCommentSecond = bigPicture.querySelector('.social__comment:nth-child(2) .social__picture');
  var bigCommentText = bigPicture.querySelector('.social__comment .social__text');
  var bigCommentTextSecond = bigPicture.querySelector('.social__comment:nth-child(2) .social__text');

  bigImage.src = data.url;
  bigLikes.textContent = data.likes;
  bigCommentsCount.textContent = comments.length;

  bigCommentFirst.alt = names[Math.floor(Math.random() * names.length)];
  bigCommentSecond.alt = names[Math.floor(Math.random() * names.length)];
  bigCommentFirst.src = 'img/avatar-' + Math.floor((Math.random() * 5) + 1) + '.svg';
  bigCommentSecond.src = 'img/avatar-' + Math.floor((Math.random() * 5) + 1) + '.svg';

  bigCommentText.textContent = comments[Math.floor(Math.random() * comments.length)];
  bigCommentTextSecond.textContent = comments[Math.floor(Math.random() * comments.length)];
};

var getAllPhotos = function () {
  for (var i = 0; i < 25; i++) {
  getHtml(getPictureData());
  photoNumber++;
  }
};

var getPinDefault = function () {
  sliderPin.style.left = '100%';
  sliderPinLine.style.width = '100%';
  slider.style = 'visibility: visible';
}

var getScaleDefault = function () {
  previewPic.style.transform = 'scale(1)';
  scaleValue.value = '100%';
}

var getPreviewDefault = function () {
  previewPic.className = 'effects__preview--none';
  slider.style = 'visibility: hidden';
  previewPic.style.filter = 'none';
}

getBigImageInfo(getPictureData());
getAllPhotos();

uploadButton.addEventListener('change', function (evt) {
  editPopup.classList.remove('hidden');
});

closeEdit.addEventListener('click', function (evt) {
  editPopup.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    editPopup.classList.add('hidden');
    document.querySelector('.img-upload__form').reset();
    getPreviewDefault();
  }
});

var chromeEffect = document.querySelector('#effect-chrome');
chromeEffect.addEventListener('click', function (evt) {
  previewPic.className = 'effects__preview--chrome';
  previewPic.style.filter = 'grayscale(100%)';
  getPinDefault();
});

var sepiaEffect = document.querySelector('#effect-sepia');
sepiaEffect.addEventListener('click', function (evt) {
  previewPic.className = 'effects__preview--sepia';
  previewPic.style.filter = 'sepia(100%)';
  getPinDefault();
});

var marvinEffect = document.querySelector('#effect-marvin');
marvinEffect.addEventListener('click', function (evt) {
  previewPic.className = 'effects__preview--marvin';
  previewPic.style.filter = 'invert(100%)';
  getPinDefault();
});

var phobosEffect = document.querySelector('#effect-phobos');
phobosEffect.addEventListener('click', function (evt) {
  previewPic.className = 'effects__preview--phobos';
  previewPic.style.filter = 'blur(3px)';
  getPinDefault();
});

var heatEffect = document.querySelector('#effect-heat');
heatEffect.addEventListener('click', function (evt) {
  previewPic.className = 'effects__preview--heat';
  previewPic.style.filter = 'brightness(3)';
  getPinDefault();
});

var originEffect = document.querySelector('#effect-none');
originEffect.addEventListener('click', function (evt) {
  getPreviewDefault();
});

slider.addEventListener('mouseup', function (evt) {
  var sliderWidth = document.querySelector('.effect-level__line').offsetWidth;
  var sliderStart = fullDoc.offsetWidth / 2 - sliderWidth / 2;
  var sliderEnd = fullDoc.offsetWidth / 2 + sliderWidth / 2;
  if (evt.clientX >= sliderStart && evt.clientX <= sliderEnd) {
    var pinProcent = Math.floor((evt.clientX - sliderStart) / sliderWidth * 100);
    sliderPin.style.left = pinProcent + '%';
    sliderPinLine.style.width = pinProcent + '%';

    if (previewPic.classList.contains('effects__preview--chrome')) {
      var filterGray = 'grayscale(' + pinProcent + '%)';
      previewPic.style.filter = filterGray;
    } else if (previewPic.classList.contains('effects__preview--sepia')) {
      var filterSepia = 'sepia(' + pinProcent + '%)';
      previewPic.style.filter = filterSepia;
    } else if (previewPic.classList.contains('effects__preview--marvin')) {
      var filterInvert = 'invert(' + pinProcent + '%)';
      previewPic.style.filter = filterInvert;
    } else if (previewPic.classList.contains('effects__preview--phobos')) {
      var blurValue = pinProcent / 100 * 3;
      var filterBlur = 'blur(' + blurValue + 'px)';
      previewPic.style.filter = filterBlur;
    } else if (previewPic.classList.contains('effects__preview--heat')) {
      var heatValue = pinProcent / 100 * 2 + 1;
      var filterHeat = 'brightness(' + heatValue + ')';
      previewPic.style.filter = filterHeat;
    }
  }
});

var scaleSmaller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');

getScaleDefault();

var scaleStep = 25;

scaleSmaller.addEventListener('click', function (evt) {
  if (parseInt(scaleValue.value, 10) > 0) {
  scaleValue.value = parseInt(scaleValue.value, 10) - scaleStep + '%';
  previewPic.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  }
});

scaleBigger.addEventListener('click', function (evt) {
  if (parseInt(scaleValue.value, 10) < 100) {
  scaleValue.value = parseInt(scaleValue.value, 10) + scaleStep + '%';
  previewPic.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  }
});

var hashInput = document.querySelector('.text__hashtags');
var inputValue = hashInput.value;
var inputPattern = document.querySelector('.text__hashtags').pattern;
var patHtml = '[&#x23;]{1}[A-Za-zА-Яа-яЁё]{1,19}';

var getInputValidity = function () {
  var hashArray = document.querySelector('.text__hashtags').value.split(" ");
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

  if (!hashInput.value.match(/[&#x23;]/g)) {
    hashInput.setCustomValidity("Укажи хэштег первым символом");
  } else {
    hashInput.setCustomValidity("");
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

