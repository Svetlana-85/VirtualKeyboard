export default class Key {
  constructor({ small, shift, code }) {
    this.small = small;
    this.shift = shift;
    this.code = code;

    // eslint-disable-next-line no-undef
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
      case 'Down': letter.innerHTML = '&darr;'; break;
      case 'Up': letter.innerHTML = '&uarr;'; break;
      case 'Left': letter.innerHTML = '&larr;'; break;
      case 'Right': letter.innerHTML = '&rarr;'; break;
      case 'Space': break;
      default: letter.textContent = small;
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
