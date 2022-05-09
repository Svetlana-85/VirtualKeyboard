import Key from './key.js';
import en from './layouts/en.js';
import ru from './layouts/ru.js';

function set(nameItem, val) {
    // eslint-disable-next-line no-undef
  window.localStorage.setItem(nameItem, val);
}
  
function get(nameItem, val) {
  // eslint-disable-next-line no-undef
  return (window.localStorage.getItem(nameItem) || val);
}

// eslint-disable-next-line no-undef
const body = document.querySelector('body');

export default class Keyboard {
  constructor(rowsKeybord, lang) {
    // eslint-disable-next-line no-undef
    this.lang = lang;
    this.rowsKeybord = rowsKeybord;
    const doc = document;
    const body = doc.querySelector('body');
    const wrapper = doc.createElement('div');
    wrapper.classList.add('wrapper');
    body.prepend(wrapper);
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
        //key.keyContent.setAtribute("code", keyObj.code);
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
      keyObj.keyContent.classList.add('activeKey');
      if (code.match(/Control/)) this.isControl = true;
      if (code.match(/Shift/)) this.isShift = true;
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
        keyObj.keyContent.classList.remove('activeKey');
        if (keyObj.code.match(/Control/)) this.isControl = false;
        if (keyObj.code.match(/Shift/)) this.isShift = false;
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
    } else if (keyObj.code === 'MetaLeft'){

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
        if (this.keys[i].shift && !this.keys[i].code.match(/Arrow/))
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
