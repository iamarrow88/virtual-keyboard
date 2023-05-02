import { focusOnTextarea } from './cursorMoving.js';
import state from './state/state.js';
import htmlElements from './state/htmlElements.js';
import { changeLang } from './changeLang.js';
import { createBlock } from './create.js';
import langLetters from '../langs/langLetters.js';

function keyDown(event) {
  focusOnTextarea();
  state.posCaret = htmlElements.textarea.selectionStart;
  const idElem = document.querySelector(`#${event.code}`);

  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    state.isCapsOn = true;
    state.stack.push('shift');

    if (state.stack.length > 2) state.stack.shift();
  }

  if (event.code === 'AltLeft' || event.code === 'AltRight') {
    event.preventDefault();
    state.stack.push('alt');
    state.altToggle = true;

    if (state.stack.length > 2) state.stack.shift();
  }

  if (event.code === 'CapsLock') {
    state.capsToggle = !state.capsToggle;
    createBlock(langLetters[state.langFromLocalStorage], !state.isCapsOn);
  } else {
    state.langFromLocalStorage = changeLang('keyboard');
  }

  idElem.classList.add('active');
  state.posCaret = htmlElements.textarea.selectionStart;
}

function keyUp(event) {
  focusOnTextarea();
  const active = document.querySelector('.active');
  if (active) active.classList.remove('active');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    state.isCapsOn = false;
  }
}

export { keyDown, keyUp };
