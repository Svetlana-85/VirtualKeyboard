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


 // eslint-disable-next-line no-undef

const body = document.querySelector('body');
class Keyboard {
  constructor(rowsKeybord, lang) {
    // eslint-disable-next-line no-undef
    this.lang = lang;
    this.isShift = false;
    this.rowsKeybord = rowsKeybord;
    const doc = document;
    const body = doc.querySelector('body');
    const wrapper = doc.createElement('div');
    wrapper.classList.add('wrapper');
    body.prepend(wrapper);
    const h1 = doc.createElement('h1');
    h1.innerHTML = 'Virtual Keyboard';
    wrapper.appendChild(h1);
    const p = doc.createElement('p');
    p.innerHTML = 'Переключение раскладки: Shift+Ctrl';
    wrapper.appendChild(p);
    this.edit = doc.createElement('textarea');
    this.edit.classList.add('edit');
    wrapper.appendChild(this.edit);
    const keyboardDoc = doc.createElement('div');
    keyboardDoc.classList.add('Keyboard');
    wrapper.appendChild(keyboardDoc);
    this.keys = [];
    this.langLetter = lang === 'ru' ? _layouts_ru_js__WEBPACK_IMPORTED_MODULE_2__["default"] : _layouts_en_js__WEBPACK_IMPORTED_MODULE_1__["default"];

    for (let i = 0; i < rowsKeybord.length; i += 1) {
      const keyboardLine = doc.createElement('div');
      keyboardLine.classList.add('keyboardLine');
      keyboardDoc.appendChild(keyboardLine);

      for (let j = 0; j < rowsKeybord[i].length; j += 1) {
        const keyObj = this.langLetter.find(value => value.code === rowsKeybord[i][j]);
        if (!keyObj) return;
        const key = new _key_js__WEBPACK_IMPORTED_MODULE_0__["default"](keyObj);
        this.keys.push(key);
        keyboardLine.appendChild(key.keyContent);
      }
    }

    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    document.addEventListener('mousedown', this.handleEvent);
    document.addEventListener('mouseup', this.handleEvent);
  }

  handleEvent = e => {
    if (e.stopPropagation) e.stopPropagation();
    let code;

    if (e.type.match(/mouse/) && e.target.closest('.key')) {
      const {
        dataset: {
          codeKey
        }
      } = e.target.closest('.key');
      code = codeKey;
    } else code = e.code;

    const keyObj = this.keys.find(value => value.code === code);
    if (!keyObj) return;
    this.edit.focus();

    if (e.type.match(/keydown/)) {
      e.preventDefault();
      keyObj.keyContent.classList.add('activeKey');
      if (e.code.match(/Control/)) this.isControl = true;
      if (e.code.match(/Shift/)) this.isShift = true;
      if (this.isControl && e.code.match(/Shift/) || this.isShift && e.code.match(/Control/)) this.changeLanguage();
      this.printKeyboard(keyObj);
    } else if (e.type.match(/mousedown/)) {
      if (code.match(/Shift/)) {
        const shift = document.querySelectorAll('.keyShift');
        shift[0].classList.toggle('activeKey');
        shift[1].classList.toggle('activeKey'); //keyObj.keyContent.classList.toggle('activeKey');

        this.isShift = !this.isShift;
      } else keyObj.keyContent.classList.add('activeKey');

      if (code.match(/Control/)) this.isControl = true;
      if (this.isControl && code.match(/Shift/) || this.isShift && code.match(/Control/)) this.changeLanguage();
      this.printKeyboard(keyObj);
    } else if (e.type.match(/keyup/)) {
      keyObj.keyContent.classList.remove('activeKey');
      if (e.code.match(/Control/)) this.isControl = false;
      if (e.code.match(/Shift/)) this.isShift = false;
    } else if (e.type.match(/mouseup/)) {
      if (!code.match(/Shift/)) {
        keyObj.keyContent.classList.remove('activeKey');
      }

      if (keyObj.code.match(/Control/)) this.isControl = false;
    }
  };
  printKeyboard = keyObj => {
    let cursorPos = this.edit.selectionStart;
    const leftText = this.edit.value.slice(0, cursorPos);
    const rightText = this.edit.value.slice(cursorPos);

    if (keyObj.code === 'Delete') {
      this.edit.value = leftText + rightText.slice(1);
    } else if (keyObj.code === 'Backspace') {
      this.edit.value = leftText.slice(0, -1) + rightText;
      cursorPos -= 1;
    } else if (keyObj.code === 'Enter') {
      this.edit.value = leftText + '\n' + rightText;
      cursorPos += 1;
    } else if (keyObj.code === 'Tab') {
      this.edit.value = leftText + '\t' + rightText;
      cursorPos += 1;
    } else if (keyObj.code === 'Space') {
      this.edit.value = leftText + ' ' + rightText;
      cursorPos += 1;
    } else if (keyObj.code === 'ArrowLeft') {
      if (cursorPos - 1 > 0) cursorPos -= 1;else cursorPos = 0;
    } else if (keyObj.code === 'ArrowRight') {
      cursorPos += 1;
    } else if (keyObj.code === 'ArrowUp') {
      cursorPos = cursorPos;
    } else if (keyObj.code === 'ArrowDown') {
      cursorPos = cursorPos;
    } else if (keyObj.code === 'CapsLock') {
      cursorPos = cursorPos;
    } else if (keyObj.code === 'ControlRight' || keyObj.code === 'ControlLeft') {
      cursorPos = cursorPos;
    } else if (keyObj.code === 'AltLeft' || keyObj.code === 'AltRight') {
      cursorPos = cursorPos;
    } else if (keyObj.code === 'ShiftLeft' || keyObj.code === 'ShiftRight') {
      cursorPos = cursorPos;
    } else if (keyObj.code === 'MetaLeft') {
      cursorPos = cursorPos;
    } else {
      this.edit.value = leftText + keyObj.small + rightText;
      cursorPos += 1;
    }

    this.edit.setSelectionRange(cursorPos, cursorPos);
  };
  changeLanguage = () => {
    this.lang = this.lang === "ru" ? "en" : "ru";
    window.localStorage.setItem('LangKeyboard', this.lang);
    this.langLetter = this.lang === 'ru' ? _layouts_ru_js__WEBPACK_IMPORTED_MODULE_2__["default"] : _layouts_en_js__WEBPACK_IMPORTED_MODULE_1__["default"];

    for (let i = 0; i < this.keys.length; i += 1) {
      const keyObj = this.langLetter.find(value => value.code === this.keys[i].code);
      if (!keyObj) return;
      this.keys[i].small = keyObj.small;
      this.keys[i].shift = keyObj.shift;
      if (this.keys[i].shift && !this.keys[i].code.match(/Arrow/) && !this.keys[i].code.match(/Space/)) this.keys[i].keyContent.querySelector(".letter").innerHTML = keyObj.small;

      if (this.keys[i].shift && this.keys[i].small.match(/[0-9-+=[\];'\\,./`]/)) {
        this.keys[i].keyContent.querySelector(".keySpec").innerHTML = keyObj.shift;
      }

      if (this.keys[i].shift && this.keys[i].small.match(/[ёхъжэбю]/)) {
        this.keys[i].keyContent.querySelector(".keySpec").innerHTML = '';
      }
    }
  };
}

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
class Key {
  constructor({
    small,
    shift,
    code
  }) {
    this.small = small;
    this.shift = shift;
    this.code = code; // eslint-disable-next-line no-undef

    const doc = document;
    const key = doc.createElement('div');
    key.classList.add('key');
    key.dataset.codeKey = code;
    const keySpec = doc.createElement('div');
    keySpec.classList.add('keySpec');

    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      keySpec.textContent = shift;
    } else {
      keySpec.textContent = '';
    }

    const letter = doc.createElement('div');
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
  }

}

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

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/style.css */ "./src/styles/style.css");
/* eslint-disable import/extensions */


const rowsKeybord = [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'], ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'], ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'], ['ShiftLeft', 'IntlSlash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'], ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']]; // eslint-disable-next-line no-undef

const lang = window.localStorage.getItem('LangKeyboard') || 'en'; // eslint-disable-next-line no-new

new _Keyboard_js__WEBPACK_IMPORTED_MODULE_0__["default"](rowsKeybord, lang);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map