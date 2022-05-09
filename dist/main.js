/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Keyboard.js":
/*!****************************!*\
  !*** ./src/js/Keyboard.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./key.js */ "./src/js/key.js");
/* harmony import */ var _layouts_en_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layouts/en.js */ "./src/js/layouts/en.js");
/* harmony import */ var _layouts_ru_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layouts/ru.js */ "./src/js/layouts/ru.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function set(nameItem, val) {
  // eslint-disable-next-line no-undef
  window.localStorage.setItem(nameItem, val);
}

function get(nameItem, val) {
  // eslint-disable-next-line no-undef
  return window.localStorage.getItem(nameItem) || val;
} // eslint-disable-next-line no-undef


var body = document.querySelector('body');

var Keyboard = /*#__PURE__*/_createClass(function Keyboard(rowsKeybord, lang) {
  var _this = this;

  _classCallCheck(this, Keyboard);

  _defineProperty(this, "handleEvent", function (e) {
    if (e.stopPropagation) e.stopPropagation();
    var code;

    if (e.type.match(/mouse/) && e.target.closest('.key')) {
      var _e$target$closest = e.target.closest('.key'),
          codeKey = _e$target$closest.dataset.codeKey;

      code = codeKey;
    } else code = e.code;

    var keyObj = _this.keys.find(function (value) {
      return value.code === code;
    });

    if (!keyObj) return;

    _this.edit.focus();

    if (e.type.match(/keydown/)) {
      e.preventDefault();
      keyObj.keyContent.classList.add('activeKey');
      if (e.code.match(/Control/)) _this.isControl = true;
      if (e.code.match(/Shift/)) _this.isShift = true;
      if (_this.isControl && e.code.match(/Shift/) || _this.isShift && e.code.match(/Control/)) _this.changeLanguage();

      _this.printKeyboard(keyObj);
    } else if (e.type.match(/mousedown/)) {
      keyObj.keyContent.classList.add('activeKey');
      if (code.match(/Control/)) _this.isControl = true;
      if (code.match(/Shift/)) _this.isShift = true;
      if (_this.isControl && code.match(/Shift/) || _this.isShift && code.match(/Control/)) _this.changeLanguage();

      _this.printKeyboard(keyObj);
    } else if (e.type.match(/keyup/)) {
      keyObj.keyContent.classList.remove('activeKey');
      if (e.code.match(/Control/)) _this.isControl = false;
      if (e.code.match(/Shift/)) _this.isShift = false;
    } else if (e.type.match(/mouseup/)) {
      keyObj.keyContent.classList.remove('activeKey');
      if (keyObj.code.match(/Control/)) _this.isControl = false;
      if (keyObj.code.match(/Shift/)) _this.isShift = false;
    }
  });

  _defineProperty(this, "printKeyboard", function (keyObj) {
    var cursorPos = _this.edit.selectionStart;

    var leftText = _this.edit.value.slice(0, cursorPos);

    var rightText = _this.edit.value.slice(cursorPos);

    if (keyObj.code === 'Delete') {
      _this.edit.value = leftText + rightText.slice(1);
    } else if (keyObj.code === 'Backspace') {
      _this.edit.value = leftText.slice(0, -1) + rightText;
      cursorPos -= 1;
    } else if (keyObj.code === 'Enter') {
      _this.edit.value = leftText + '\n' + rightText;
      cursorPos += 1;
    } else if (keyObj.code === 'Tab') {
      _this.edit.value = leftText + '\t' + rightText;
      cursorPos += 1;
    } else if (keyObj.code === 'MetaLeft') {} else {
      _this.edit.value = leftText + keyObj.small + rightText;
      cursorPos += 1;
    }

    _this.edit.setSelectionRange(cursorPos, cursorPos);
  });

  _defineProperty(this, "changeLanguage", function () {
    _this.lang = _this.lang === "ru" ? "en" : "ru";
    window.localStorage.setItem('LangKeyboard', _this.lang);
    _this.langLetter = _this.lang === 'ru' ? _layouts_ru_js__WEBPACK_IMPORTED_MODULE_2__["default"] : _layouts_en_js__WEBPACK_IMPORTED_MODULE_1__["default"];

    var _loop = function _loop(i) {
      var keyObj = _this.langLetter.find(function (value) {
        return value.code === _this.keys[i].code;
      });

      if (!keyObj) return {
        v: void 0
      };
      _this.keys[i].small = keyObj.small;
      _this.keys[i].shift = keyObj.shift;
      if (_this.keys[i].shift && !_this.keys[i].code.match(/Arrow/)) _this.keys[i].keyContent.querySelector(".letter").innerHTML = keyObj.small;

      if (_this.keys[i].shift && _this.keys[i].small.match(/[0-9-+=[\];'\\,./`]/)) {
        _this.keys[i].keyContent.querySelector(".keySpec").innerHTML = keyObj.shift;
      }

      if (_this.keys[i].shift && _this.keys[i].small.match(/[ёхъжэбю]/)) {
        _this.keys[i].keyContent.querySelector(".keySpec").innerHTML = '';
      }
    };

    for (var i = 0; i < _this.keys.length; i += 1) {
      var _ret = _loop(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }
  });

  // eslint-disable-next-line no-undef
  this.lang = lang;
  this.rowsKeybord = rowsKeybord;
  var doc = document;
  var body = doc.querySelector('body');
  var wrapper = doc.createElement('div');
  wrapper.classList.add('wrapper');
  body.prepend(wrapper);
  this.edit = doc.createElement('textarea');
  this.edit.classList.add('edit');
  wrapper.appendChild(this.edit);
  var keyboardDoc = doc.createElement('div');
  keyboardDoc.classList.add('Keyboard');
  wrapper.appendChild(keyboardDoc);
  this.keys = [];
  this.langLetter = lang === 'ru' ? _layouts_ru_js__WEBPACK_IMPORTED_MODULE_2__["default"] : _layouts_en_js__WEBPACK_IMPORTED_MODULE_1__["default"];

  var _loop2 = function _loop2(i) {
    var keyboardLine = doc.createElement('div');
    keyboardLine.classList.add('keyboardLine');
    keyboardDoc.appendChild(keyboardLine);

    var _loop3 = function _loop3(j) {
      var keyObj = _this.langLetter.find(function (value) {
        return value.code === rowsKeybord[i][j];
      });

      if (!keyObj) return {
        v: {
          v: void 0
        }
      };
      var key = new _key_js__WEBPACK_IMPORTED_MODULE_0__["default"](keyObj); //key.keyContent.setAtribute("code", keyObj.code);

      _this.keys.push(key);

      keyboardLine.appendChild(key.keyContent);
    };

    for (var j = 0; j < rowsKeybord[i].length; j += 1) {
      var _ret3 = _loop3(j);

      if (_typeof(_ret3) === "object") return _ret3.v;
    }
  };

  for (var i = 0; i < rowsKeybord.length; i += 1) {
    var _ret2 = _loop2(i);

    if (_typeof(_ret2) === "object") return _ret2.v;
  }

  document.addEventListener('keydown', this.handleEvent);
  document.addEventListener('keyup', this.handleEvent);
  document.addEventListener('mousedown', this.handleEvent);
  document.addEventListener('mouseup', this.handleEvent);
});



/***/ }),

/***/ "./src/js/key.js":
/*!***********************!*\
  !*** ./src/js/key.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Key)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = /*#__PURE__*/_createClass(function Key(_ref) {
  var small = _ref.small,
      shift = _ref.shift,
      code = _ref.code;

  _classCallCheck(this, Key);

  this.small = small;
  this.shift = shift;
  this.code = code; // eslint-disable-next-line no-undef

  var doc = document;
  var key = doc.createElement('div');
  key.classList.add('key');
  key.dataset.codeKey = code;
  var keySpec = doc.createElement('div');
  keySpec.classList.add('keySpec');

  if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
    keySpec.textContent = shift;
  } else {
    keySpec.textContent = '';
  }

  var letter = doc.createElement('div');
  letter.classList.add('letter');

  switch (small) {
    case 'Down':
      letter.innerHTML = '&darr;';
      break;

    case 'Up':
      letter.innerHTML = '&uarr;';
      break;

    case 'Left':
      letter.innerHTML = '&larr;';
      break;

    case 'Right':
      letter.innerHTML = '&rarr;';
      break;

    case 'Space':
      break;

    default:
      letter.textContent = small;
  }

  key.appendChild(keySpec);
  key.appendChild(letter);
  this.keyContent = key;

  if (small.match(/[a-zа-яё0-9-+`=[\];'\\,./]/)) {
    key.classList.add('keyLetter');
  }

  if (small === 'Delete') {
    key.classList.add('keyDel');
  }

  if (small === 'Backspace' || small === 'Tab' || small === 'CapsLock' || small === 'Enter') {
    key.classList.add('keySpec2');
  }

  if (small === 'Delete') {
    key.classList.add('keyDel');
  }

  if (small === 'Shift') {
    key.classList.add('keyShift');
  }

  if (small === 'Ctrl') {
    key.classList.add('keyCtrl');
  }

  if (small === 'Alt') {
    key.classList.add('keyAlt');
  }

  if (small === 'Space') {
    key.classList.add('keySpace');
  }
});



/***/ }),

/***/ "./src/js/layouts/en.js":
/*!******************************!*\
  !*** ./src/js/layouts/en.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  small: '`',
  shift: '~',
  code: 'Backquote'
}, {
  small: '1',
  shift: '!',
  code: 'Digit1'
}, {
  small: '2',
  shift: '@',
  code: 'Digit2'
}, {
  small: '3',
  shift: '#',
  code: 'Digit3'
}, {
  small: '4',
  shift: '$',
  code: 'Digit4'
}, {
  small: '5',
  shift: '%',
  code: 'Digit5'
}, {
  small: '6',
  shift: '^',
  code: 'Digit6'
}, {
  small: '7',
  shift: '&',
  code: 'Digit7'
}, {
  small: '8',
  shift: '*',
  code: 'Digit8'
}, {
  small: '9',
  shift: '(',
  code: 'Digit9'
}, {
  small: '0',
  shift: ')',
  code: 'Digit0'
}, {
  small: '-',
  shift: '_',
  code: 'Minus'
}, {
  small: '=',
  shift: '+',
  code: 'Equal'
}, {
  small: 'Delete',
  shift: '',
  code: 'Delete'
}, {
  small: 'Tab',
  shift: 'null',
  code: 'Tab'
}, {
  small: 'q',
  shift: 'Q',
  code: 'KeyQ'
}, {
  small: 'w',
  shift: 'W',
  code: 'KeyW'
}, {
  small: 'e',
  shift: 'E',
  code: 'KeyE'
}, {
  small: 'r',
  shift: 'R',
  code: 'KeyR'
}, {
  small: 't',
  shift: 'T',
  code: 'KeyT'
}, {
  small: 'y',
  shift: 'Y',
  code: 'KeyY'
}, {
  small: 'u',
  shift: 'U',
  code: 'KeyU'
}, {
  small: 'i',
  shift: 'I',
  code: 'KeyI'
}, {
  small: 'o',
  shift: 'O',
  code: 'KeyO'
}, {
  small: 'p',
  shift: 'P',
  code: 'KeyP'
}, {
  small: '[',
  shift: '{',
  code: 'BracketLeft'
}, {
  small: ']',
  shift: '}',
  code: 'BracketRight'
}, {
  small: 'Backspace',
  shift: '',
  code: 'Backspace'
}, {
  small: 'CapsLock',
  shift: 'null',
  code: 'CapsLock'
}, {
  small: 'a',
  shift: 'A',
  code: 'KeyA'
}, {
  small: 's',
  shift: 'S',
  code: 'KeyS'
}, {
  small: 'd',
  shift: 'D',
  code: 'KeyD'
}, {
  small: 'f',
  shift: 'F',
  code: 'KeyF'
}, {
  small: 'g',
  shift: 'G',
  code: 'KeyG'
}, {
  small: 'h',
  shift: 'H',
  code: 'KeyH'
}, {
  small: 'j',
  shift: 'J',
  code: 'KeyJ'
}, {
  small: 'k',
  shift: 'K',
  code: 'KeyK'
}, {
  small: 'l',
  shift: 'L',
  code: 'KeyL'
}, {
  small: ';',
  shift: ':',
  code: 'Semicolon'
}, {
  small: '\'',
  shift: '"',
  code: 'Quote'
}, {
  small: '\\',
  shift: '|',
  code: 'Backslash'
}, {
  small: 'Enter',
  shift: 'null',
  code: 'Enter'
}, {
  small: 'Shift',
  shift: 'null',
  code: 'ShiftLeft'
}, {
  small: '\\',
  shift: '?',
  code: 'IntlSlash'
}, {
  small: 'z',
  shift: 'Z',
  code: 'KeyZ'
}, {
  small: 'x',
  shift: 'X',
  code: 'KeyX'
}, {
  small: 'c',
  shift: 'C',
  code: 'KeyC'
}, {
  small: 'v',
  shift: 'V',
  code: 'KeyV'
}, {
  small: 'b',
  shift: 'B',
  code: 'KeyB'
}, {
  small: 'n',
  shift: 'N',
  code: 'KeyN'
}, {
  small: 'm',
  shift: 'M',
  code: 'KeyM'
}, {
  small: ',',
  shift: '<',
  code: 'Comma'
}, {
  small: '.',
  shift: '>',
  code: 'Period'
}, {
  small: 'Shift',
  shift: 'null',
  code: 'ShiftRight'
}, {
  small: 'Ctrl',
  shift: 'null',
  code: 'ControlLeft'
}, {
  small: 'Win',
  shift: 'null',
  code: 'MetaLeft'
}, {
  small: 'Alt',
  shift: 'null',
  code: 'AltLeft'
}, {
  small: 'Space',
  shift: 'null',
  code: 'Space'
}, {
  small: 'Alt',
  shift: 'null',
  code: 'AltRight'
}, {
  small: 'Ctrl',
  shift: 'null',
  code: 'ControlRight'
}, {
  small: '/',
  shift: '?',
  code: 'Slash'
}, {
  small: 'Left',
  // <-
  shift: 'null',
  code: 'ArrowLeft'
}, {
  small: 'Up',
  shift: 'null',
  code: 'ArrowUp'
}, {
  small: 'Down',
  shift: 'null',
  code: 'ArrowDown'
}, {
  small: 'Right',
  shift: 'null',
  code: 'ArrowRight'
}]);

/***/ }),

/***/ "./src/js/layouts/ru.js":
/*!******************************!*\
  !*** ./src/js/layouts/ru.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  small: 'ё',
  shift: 'Ё',
  code: 'Backquote'
}, {
  small: '1',
  shift: '!',
  code: 'Digit1'
}, {
  small: '2',
  shift: '"',
  code: 'Digit2'
}, {
  small: '3',
  shift: '№',
  code: 'Digit3'
}, {
  small: '4',
  shift: ';',
  code: 'Digit4'
}, {
  small: '5',
  shift: '%',
  code: 'Digit5'
}, {
  small: '6',
  shift: ':',
  code: 'Digit6'
}, {
  small: '7',
  shift: '?',
  code: 'Digit7'
}, {
  small: '8',
  shift: '*',
  code: 'Digit8'
}, {
  small: '9',
  shift: '(',
  code: 'Digit9'
}, {
  small: '0',
  shift: ')',
  code: 'Digit0'
}, {
  small: '-',
  shift: '_',
  code: 'Minus'
}, {
  small: '=',
  shift: '+',
  code: 'Equal'
}, {
  small: 'Delete',
  shift: '',
  code: 'Delete'
}, {
  small: 'Backspace',
  shift: '',
  code: 'Backspace'
}, {
  small: 'Tab',
  shift: 'null',
  code: 'Tab'
}, {
  small: 'й',
  shift: 'Й',
  code: 'KeyQ'
}, {
  small: 'ц',
  shift: 'Ц',
  code: 'KeyW'
}, {
  small: 'у',
  shift: 'У',
  code: 'KeyE'
}, {
  small: 'к',
  shift: 'К',
  code: 'KeyR'
}, {
  small: 'е',
  shift: 'Е',
  code: 'KeyT'
}, {
  small: 'н',
  shift: 'Н',
  code: 'KeyY'
}, {
  small: 'г',
  shift: 'Г',
  code: 'KeyU'
}, {
  small: 'ш',
  shift: 'Ш',
  code: 'KeyI'
}, {
  small: 'щ',
  shift: 'Щ',
  code: 'KeyO'
}, {
  small: 'з',
  shift: 'З',
  code: 'KeyP'
}, {
  small: 'х',
  shift: 'Х',
  code: 'BracketLeft'
}, {
  small: 'ъ',
  shift: 'Ъ',
  code: 'BracketRight'
}, {
  small: '\\',
  shift: '|',
  code: 'Backslash'
}, {
  small: '\\',
  shift: '/',
  code: 'IntlSlash'
}, {
  small: 'CapsLock',
  shift: 'null',
  code: 'CapsLock'
}, {
  small: 'ф',
  shift: 'Ф',
  code: 'KeyA'
}, {
  small: 'ы',
  shift: 'Ы',
  code: 'KeyS'
}, {
  small: 'в',
  shift: 'В',
  code: 'KeyD'
}, {
  small: 'а',
  shift: 'А',
  code: 'KeyF'
}, {
  small: 'п',
  shift: 'П',
  code: 'KeyG'
}, {
  small: 'р',
  shift: 'Р',
  code: 'KeyH'
}, {
  small: 'о',
  shift: 'О',
  code: 'KeyJ'
}, {
  small: 'л',
  shift: 'Л',
  code: 'KeyK'
}, {
  small: 'д',
  shift: 'Д',
  code: 'KeyL'
}, {
  small: 'ж',
  shift: 'Ж',
  code: 'Semicolon'
}, {
  small: 'э',
  shift: 'Э',
  code: 'Quote'
}, {
  small: '',
  shift: '',
  code: ''
}, {
  small: 'Enter',
  shift: 'null',
  code: 'Enter'
}, {
  small: 'Shift',
  shift: 'null',
  code: 'ShiftLeft'
}, {
  small: 'я',
  shift: 'Я',
  code: 'KeyZ'
}, {
  small: 'ч',
  shift: 'Ч',
  code: 'KeyX'
}, {
  small: 'с',
  shift: 'С',
  code: 'KeyC'
}, {
  small: 'м',
  shift: 'М',
  code: 'KeyV'
}, {
  small: 'и',
  shift: 'И',
  code: 'KeyB'
}, {
  small: 'т',
  shift: 'Т',
  code: 'KeyN'
}, {
  small: 'ь',
  shift: 'Ь',
  code: 'KeyM'
}, {
  small: 'б',
  shift: 'Б',
  code: 'Comma'
}, {
  small: 'ю',
  shift: 'Ю',
  code: 'Period'
}, {
  small: '.',
  shift: ',',
  code: 'Slash'
}, {
  small: 'Shift',
  shift: 'null',
  code: 'ShiftRight'
}, {
  small: 'Ctrl',
  shift: 'hull',
  code: 'ControlLeft'
}, {
  small: 'Win',
  shift: 'null',
  code: 'MetaLeft'
}, {
  small: 'Alt',
  shift: 'null',
  code: 'AltLeft'
}, {
  small: 'Space',
  shift: 'null',
  code: 'Space'
}, {
  small: 'Alt',
  shift: 'null',
  code: 'AltRight'
}, {
  small: 'Ctrl',
  shift: 'null',
  code: 'ControlRight'
}, {
  small: 'Left',
  shift: 'null',
  code: 'ArrowLeft'
}, {
  small: 'Up',
  shift: 'null',
  code: 'ArrowUp'
}, {
  small: 'Down',
  shift: 'null',
  code: 'ArrowDown'
}, {
  small: 'Right',
  shift: 'null',
  code: 'ArrowRight'
}]);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Keyboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Keyboard.js */ "./src/js/Keyboard.js");
/* eslint-disable import/extensions */

var rowsKeybord = [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'], ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'], ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'], ['ShiftLeft', 'IntlSlash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'], ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']]; // eslint-disable-next-line no-undef

var lang = window.localStorage.getItem('LangKeyboard') || 'en'; // get('LangKeyboard', 'en');
// eslint-disable-next-line no-new

new _Keyboard_js__WEBPACK_IMPORTED_MODULE_0__["default"](rowsKeybord, lang);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map