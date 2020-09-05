'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (func) {
    var lastTimeout = null;
    // Возвращаем новую функцию
    return function () {
      clearTimeout(lastTimeout);
      // Берем аргументы этой функции для создания нового вызова с аргументами
      var args = [];
      while (args.length < arguments.length) {
        args.push(arguments[args.length]);
      }
      // Новый вызов
      var newCall = function () {
        // Новая функция
        func.apply(null, args);
      };
      // Ставим последний из вызовов на отложенное выполнение
      lastTimeout = setTimeout(newCall, DEBOUNCE_INTERVAL);
    };
  };
})();
