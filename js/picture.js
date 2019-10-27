(function (gallery) {


var pictureCancel = document.querySelector('.big-picture__cancel');
var picturesSmall = document.querySelectorAll('.picture');
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

var getFullPicEnter = function (evt) {
  if (evt.keyCode === gallery.ENTER_KEYCODE) {
    var target = evt.target;
    bigPicSrc.src = target.querySelector('.picture__img').src;
    gallery.bigPicture.classList.remove('hidden');
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === gallery.ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  });
}

document.addEventListener('click', function (evt) {
  getFullPic(evt);
});

for (var i = 0; i < picturesSmall.length; i++) {
  picturesSmall[i].addEventListener('keydown', function (evt) {
    getFullPicEnter(evt);
  });
}

pictureCancel.addEventListener('click', function (evt) {
  bigPicture.classList.add('hidden');
});

})(gallery);
