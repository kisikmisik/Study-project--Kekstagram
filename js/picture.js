(function (data) {


var pictureCancel = document.querySelector('.big-picture__cancel');
var picturesSmall = document.querySelectorAll('.picture');
var bigPicSrc = data.bigPicture.querySelector('.big-picture__img img');

var getFullPic = function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    bigPicSrc.src = target.src;
    data.bigPicture.classList.remove('hidden');
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === data.ESC_KEYCODE) {
      data.bigPicture.classList.add('hidden');
    }
  });
};

var getFullPicEnter = function (evt) {
  if (evt.keyCode === data.ENTER_KEYCODE) {
    var target = evt.target;
    bigPicSrc.src = target.querySelector('.picture__img').src;
    data.bigPicture.classList.remove('hidden');
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === data.ESC_KEYCODE) {
      data.bigPicture.classList.add('hidden');
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
  data.bigPicture.classList.add('hidden');
});

})(data);
