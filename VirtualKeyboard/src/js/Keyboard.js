import Key from './key.js';
import en from './layouts/en.js';
import ru from './layouts/ru.js';

// eslint-disable-next-line no-undef
const body = document.querySelector('body');

export default class Keyboard {
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
    this.langLetter = lang==='ru'?ru:en;

    for (let i = 0; i < rowsKeybord.length; i += 1) {
      const keyboardLine = doc.createElement('div');
      keyboardLine.classList.add('keyboardLine');
      keyboardDoc.appendChild(keyboardLine);
      for (let j = 0; j < rowsKeybord[i].length; j += 1) {
        const keyObj = this.langLetter.find((value) => value.code === rowsKeybord[i][j]);
        if (!keyObj) return;
        const key = new Key(keyObj);
        this.keys.push(key);
        keyboardLine.appendChild(key.keyContent);
      }
    }
    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    document.addEventListener('mousedown', this.handleEvent);
    document.addEventListener('mouseup', this.handleEvent);
  }
    
  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    let code;
    if (e.type.match(/mouse/) && e.target.closest('.key')){
        const {dataset: {codeKey}} = e.target.closest('.key');
        code = codeKey;
    } else code = e.code;
    
    const keyObj = this.keys.find((value) => value.code === code);
    if (!keyObj) return;
    this.edit.focus();
    
    if (e.type.match(/keydown/)){
      e.preventDefault();
      keyObj.keyContent.classList.add('activeKey');
      if (e.code.match(/Control/)) this.isControl = true;
      if (e.code.match(/Shift/)) this.isShift = true;
      if ((this.isControl && e.code.match(/Shift/)) || (this.isShift && e.code.match(/Control/)))
        this.changeLanguage();
      this.printKeyboard(keyObj);
    } else if (e.type.match(/mousedown/)) {
      if (code.match(/Shift/)){
        const shift = document.querySelectorAll('.keyShift');
        shift[0].classList.toggle('activeKey');
        shift[1].classList.toggle('activeKey');
        //keyObj.keyContent.classList.toggle('activeKey');
        this.isShift = !this.isShift;
      }
      else keyObj.keyContent.classList.add('activeKey');
      if (code.match(/Control/)) this.isControl = true;
      if ((this.isControl && code.match(/Shift/)) || (this.isShift && code.match(/Control/)))
        this.changeLanguage();
      this.printKeyboard(keyObj);
    }
    else if (e.type.match(/keyup/)){
      keyObj.keyContent.classList.remove('activeKey');
      if (e.code.match(/Control/)) this.isControl = false;
      if (e.code.match(/Shift/)) this.isShift = false;
    }
    else if (e.type.match(/mouseup/)){
        if (!code.match(/Shift/)){
        keyObj.keyContent.classList.remove('activeKey');
        }
        if (keyObj.code.match(/Control/)) this.isControl = false;
      }
  }

  printKeyboard = (keyObj) =>{
    let cursorPos = this.edit.selectionStart;
    const leftText = this.edit.value.slice(0, cursorPos);
    const rightText = this.edit.value.slice(cursorPos);
    if (keyObj.code === 'Delete') {
        this.edit.value = leftText + rightText.slice(1);
    } else if (keyObj.code === 'Backspace'){
        this.edit.value = leftText.slice(0, -1) + rightText;
        cursorPos -= 1;
    } else if (keyObj.code === 'Enter'){
        this.edit.value = leftText + '\n' + rightText;
        cursorPos += 1;
    } else if (keyObj.code === 'Tab'){
        this.edit.value = leftText + '\t' + rightText;
        cursorPos += 1;
    } else if (keyObj.code === 'Space'){
      this.edit.value = leftText + ' ' + rightText;
      cursorPos += 1;
    } else if(keyObj.code === 'ArrowLeft'){
      if (cursorPos - 1 > 0) cursorPos -= 1
      else cursorPos = 0;
    } else if(keyObj.code === 'ArrowRight'){
      cursorPos += 1;
    } else if(keyObj.code === 'ArrowUp'){
      cursorPos = cursorPos;
    } else if(keyObj.code === 'ArrowDown'){
      cursorPos = cursorPos;
    }else if(keyObj.code === 'CapsLock'){
      cursorPos = cursorPos;
    }else if(keyObj.code === 'ControlRight' || keyObj.code === 'ControlLeft'){
      cursorPos = cursorPos;
    }else if(keyObj.code === 'AltLeft' || keyObj.code === 'AltRight'){
      cursorPos = cursorPos;
    }else if(keyObj.code === 'ShiftLeft' || keyObj.code === 'ShiftRight'){
      cursorPos = cursorPos;
    }else if(keyObj.code === 'MetaLeft'){
      cursorPos = cursorPos;
    }
    else{
        this.edit.value = leftText + keyObj.small + rightText;
        cursorPos += 1;
    }
    this.edit.setSelectionRange(cursorPos, cursorPos);
  }

  changeLanguage = () => {
    this.lang = this.lang === "ru"? "en" :"ru";
    window.localStorage.setItem('LangKeyboard', this.lang);
    this.langLetter = this.lang === 'ru'?ru:en;
    for(let i = 0; i < this.keys.length; i += 1){
        const keyObj = this.langLetter.find((value) => value.code === this.keys[i].code);
        if (!keyObj) return;
        this.keys[i].small = keyObj.small;
        this.keys[i].shift = keyObj.shift;
        if (this.keys[i].shift && !this.keys[i].code.match(/Arrow/) && !this.keys[i].code.match(/Space/))
            this.keys[i].keyContent.querySelector(".letter").innerHTML = keyObj.small;
        if (this.keys[i].shift && this.keys[i].small.match(/[0-9-+=[\];'\\,./`]/)) {
            this.keys[i].keyContent.querySelector(".keySpec").innerHTML = keyObj.shift;
        }
        if (this.keys[i].shift && this.keys[i].small.match(/[ёхъжэбю]/)) {
            this.keys[i].keyContent.querySelector(".keySpec").innerHTML = '';
        }
    }
  }
}
