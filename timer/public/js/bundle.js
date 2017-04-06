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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
            var removeButton = $('<button>').text('remove').data('id', this.id).data('type', 'remove');
            var editButton = $('<button>').text('edit').data('id', this.id).data('type', 'edit');

            var div = $('<div>').addClass('row').append($('<div>').text(this.id)).append($('<div>').text(this.date)).append($('<div>').text(this.from)).append($('<div>').text(this.until)).append($('<div>').text(this.task)).append(removeButton).append(editButton);

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

var _store = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
    function Timer() {
        _classCallCheck(this, Timer);

        this.list = $('#list');
    }

    _createClass(Timer, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.store = new _store.Store();

            this.bindEvents();

            this.store.loadAll().then(function () {
                _this.render();
            });
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this2 = this;

            $(document).on('click', function (event) {
                var target = $(event.target);
                var type = target.data('type');
                var id = target.data('id');
                switch (type) {
                    case 'save':
                        _this2.save();
                        break;
                    case 'edit':
                        _this2.edit(id);
                        break;
                    case 'remove':
                        _this2.remove(id);
                        break;
                }
            });
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            var _this3 = this;

            this.store.remove(id).then(function () {
                _this3.render();
            });
        }
    }, {
        key: 'save',
        value: function save() {
            var _this4 = this;

            var task = new _task.Task($('#id').val(), $('#date').val(), $('#from').val(), $('#until').val(), $('#task').val());
            this.store.save(task).then(function () {
                $('#form input').each(function (i, e) {
                    $(e).val('');
                });
                _this4.render();
            });
        }
    }, {
        key: 'edit',
        value: function edit(id) {
            var task = this.store.tasks.find(function (task) {
                return task.id === id;
            });
            $('#id').val(task.id);
            $('#date').val(task.date);
            $('#from').val(task.from);
            $('#until').val(task.until);
            $('#task').val(task.task);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            this.list.empty();
            this.store.tasks.forEach(function (task) {
                task.render(_this5.list);
                _this5.list.append($('<hr>'));
            });
        }
    }]);

    return Timer;
}();

/***/ }),
/* 2 */
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
            var _this = this;

            return new Promise(function (resolve, reject) {
                $.get('/timer').done(function (tasks) {
                    tasks.forEach(function (task) {
                        _this.tasks.push(new _task.Task(task.id, task.date, task.from, task.until, task.task));
                    });
                    resolve();
                });
            });
        }

        /*getNextId() {
            let id = this.id;
            this.id++;
            return id;
        }*/

    }, {
        key: 'save',
        value: function save(task) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                if (task.id === '') {
                    $.ajax({
                        url: 'timer',
                        method: 'post',
                        data: task
                    }).done(function (data) {
                        task.id = data.id;
                        _this2.tasks.push(task);
                        resolve();
                    });
                } else {
                    $.ajax({
                        url: 'timer',
                        method: 'put',
                        data: task
                    }).done(function () {
                        _this2.tasks[_this2.getIndexOfTask(task.id)] = task;
                        resolve();
                    });
                }
            });
        }
    }, {
        key: 'getIndexOfTask',
        value: function getIndexOfTask(id) {
            return this.tasks.findIndex(function (task) {
                return task.id === id;
            });
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: '/timer/' + id,
                    method: 'delete'
                }).done(function () {
                    var index = _this3.getIndexOfTask(id);
                    _this3.tasks.splice(index, 1);
                    resolve();
                });
            });
        }
    }]);

    return Store;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timer = __webpack_require__(1);

$(function () {
    var timer = new _timer.Timer();
    timer.init();
});

/***/ })
/******/ ]);