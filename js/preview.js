(function (gallery) {

window.editPopup = document.querySelector('.img-upload__overlay');
var previewPic = document.querySelector('.img-upload__preview img');
var closeEdit = document.querySelector('#upload-cancel');
var slider = document.querySelector('.effect-level');
var sliderPinLine = document.querySelector('.effect-level__depth');
var uploadButton = document.querySelector('#upload-file');
var fullDoc = document.querySelector('body');

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

uploadButton.addEventListener('change', function (evt) {
  editPopup.classList.remove('hidden');
});

closeEdit.addEventListener('click', function (evt) {
  editPopup.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === gallery.ESC_KEYCODE) {
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

var sliderPin = document.querySelector('.effect-level__pin');

sliderPin.addEventListener('mousedown', function (evt) {
  var sliderWidth = document.querySelector('.effect-level__line').offsetWidth;
  var sliderStart = fullDoc.offsetWidth / 2 - sliderWidth / 2;
  var sliderEnd = fullDoc.offsetWidth / 2 + sliderWidth / 2;

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {


    if (moveEvt.clientX > sliderStart && moveEvt.clientX < sliderEnd) {
      var pinProcent = Math.floor((moveEvt.clientX - sliderStart) / sliderWidth * 100);

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

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';
      sliderPinLine.style.width = (sliderPin.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (evt) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});



})(gallery);
