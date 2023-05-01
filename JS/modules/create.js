import htmlElements from "./state/htmlElements.js";
import state from "./state/state.js";
import addEventListeners from "./addEventListeners.js";

htmlElements.body = document.querySelector('body');

export function createBlock(langLettersArray) {
  const container = document.createElement('div');
  container.classList.add('container');
  const header = document.createElement('h1');
  header.innerHTML = 'Virtual Keyboard';
  container.prepend(header);
  const message = document.createElement('div');
  message.classList.add('message');
  message.innerHTML = 'Keyboard created on Windows. To switch language press Shift + Alt';
  container.append(message);
  const btn = document.createElement('button');
  btn.innerHTML = 'Delete all text';
  container.append(btn);
  htmlElements.body.prepend(container);
  htmlElements.textarea = document.createElement('textarea');
  htmlElements.textarea.classList.add('textarea');
  htmlElements.textarea.setAttribute('id', 'input');
  container.append(htmlElements.textarea);
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard__wrapper');
  const col = document.createElement('div');
  col.classList.add('col');
  keyboard.append(col);
  container.append(keyboard);
  for (let i = 0; i < langLettersArray.length; i++) {
    const row = createKey(langLettersArray[i], state.capsToggle);
    col.append(row);
  }
  addEventListeners();
}

export function createKey(arrayOfKeys, isCaps) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let k = 0; k < arrayOfKeys.length; k++) {
    const key = document.createElement('div');
    const elemClass = arrayOfKeys[k].code.toLowerCase();
    key.classList.add('row__keys', `${elemClass}`);
    if(isCaps){
      key.innerHTML = arrayOfKeys[k].caps;
    } else {
      key.innerHTML = arrayOfKeys[k].normal;
    }
    key.setAttribute('id', arrayOfKeys[k].code);
    key.dataset.mouseId = arrayOfKeys[k].id;
    row.append(key);
  }
  return row;
}
