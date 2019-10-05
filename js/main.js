'use strict';

var fragment = document.createDocumentFragment();
var photoNumber = 1;

var bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');
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

getBigImageInfo(getPictureData());
getAllPhotos();



