/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = exports.Task = function () {
    function Task(id, date, from, until, task) {
        _classCallCheck(this, Task);

        this.id = id;
        this.date = date;
        this.from = from;
        this.until = until;
        this.task = task;
    }

    _createClass(Task, [{
        key: 'render',
        value: function render(target) {
            var div = $('<div>').addClass('row').append($('<div>').text(this.id)).append($('<div>').text(this.date)).append($('<div>').text(this.from)).append($('<div>').text(this.until)).append($('<div>').text(this.task));

            target.append(div);
        }
    }]);

    return Task;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = __webpack_require__(0);

var _store = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
    function Timer() {
        _classCallCheck(this, Timer);

        this.list = $('#list');
    }

    _createClass(Timer, [{
        key: 'init',
        value: function init() {
            this.store = new _store.Store();

            this.bindEvents();

            this.store.loadAll();
            this.render();
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            $('#submit').on('click', function () {
                _this.create();
            });
        }
    }, {
        key: 'create',
        value: function create() {
            var task = new _task.Task(null, $('#date').val(), $('#from').val(), $('#until').val(), $('#task').val());
            this.store.create(task);
            $('#form input').each(function (i, e) {
                $(e).val('');
            });
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.list.empty();
            this.store.tasks.forEach(function (task) {
                task.render(_this2.list);
                _this2.list.append($('<hr>'));
            });
        }
    }]);

    return Timer;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timer = __webpack_require__(1);

$(function () {
    var timer = new _timer.Timer();
    timer.init();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _task = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function () {
    function Store() {
        _classCallCheck(this, Store);

        this.id = 0;
        this.tasks = [];
    }

    _createClass(Store, [{
        key: 'loadAll',
        value: function loadAll() {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var task = JSON.parse(localStorage.getItem(key));
                if (this.id < task.id) {
                    this.id = task.id;
                }
                this.tasks.push(new _task.Task(task.id, task.date, task.from, task.until, task.task));
            }
            this.id++;
        }
    }, {
        key: 'getNextId',
        value: function getNextId() {
            var id = this.id;
            this.id++;
            return id;
        }
    }, {
        key: 'create',
        value: function create(task) {
            task.id = this.getNextId();
            localStorage.setItem(task.id, JSON.stringify(task));
            this.tasks.push(task);
        }
    }]);

    return Store;
}();

/***/ })
/******/ ]);