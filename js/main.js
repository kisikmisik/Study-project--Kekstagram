'use strict';

var fragment = document.createDocumentFragment();
var photoNumber = 1;

var getComment = function () {
  var commentImg = 'photos/' + Math.floor((Math.random() * 5) + 1) + '.jpg';
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
  ]

  return {
    avatar: commentImg,
    message: comments[Math.floor(Math.random() * comments.length)],
    name: names[Math.floor(Math.random() * names.length)]
  }
};


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

var posts = [];
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');

var getHtml = function (data) {

    posts.push(getPictureData());

    var picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = data.url;
    picture.querySelector('.picture__likes').textContent = data.likes;
    picture.querySelector('.picture__comments').textContent = data.comments;

    pictures.appendChild(picture);

};

for (var i = 0; i < 25; i++) {
  getHtml(getPictureData());
  photoNumber++;
};









