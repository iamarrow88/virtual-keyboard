import state from "./JS/modules/state/state.js";
import htmlElements from './JS/modules/state/htmlElements.js'
import {
  createBlock,
} from './JS/modules/create.js';
import en from './JS/langs/en.js';
import ru from './JS/langs/ru.js';
import {
  specials,
  symbolsValues,
  symbolsKeys,
} from './JS/langs/specialKeys.js';

import changeLang from './JS/modules/changeLang.js'
import {
  findEqual,
  getElementIndex,
  checkSymbols,
  getKeyValueByIndex,
} from './JS/modules/clearSpecials.js';

import {
  backspaceDeletion,
  deleteDeletion,
} from './JS/modules/deletion.js';

import {
  arrowMove,
  enterKey,
}
  from './JS/modules/linesNavigation.js';
import { focusOnTextarea, getCaretPos } from './JS/modules/cursorMoving.js';

const langLettersCollection = [en, ru];
state.langFromLocalStorage = localStorage.getItem('langFromLocalStorage') || 0;

createBlock(langLettersCollection[state.langFromLocalStorage]);

/*htmlElements.textarea = document.getElementById('input');*/
htmlElements.keysBlock = document.querySelector('.col');
/*htmlElements.textarea = document.querySelector('.textarea');*/



/*let posCaret = 0;
const stack = [];*/

htmlElements.body.addEventListener('keydown', (event) => {
  focusOnTextarea();
  state.posCaret = htmlElements.textarea.selectionStart;
  const idElem = document.querySelector(`#${event.code}`);
  if (event.code === 'CapsLock') {
    state.capsToggle = !state.capsToggle;
  }
  if (event.code === 'AltLeft' || event.code === 'AltRight') {
    event.preventDefault();
    state.stack.push('alt');
    if (state.stack.length > 2) {
      state.stack.shift();
    }
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    state.shiftToggle = true;
    state.stack.push('shift');
    if (state.stack.length > 2) {
      state.stack.shift();
    }
  }
  const newLangFromLocalStorage = state.langFromLocalStorage;
  state.langFromLocalStorage = changeLang();
  if (newLangFromLocalStorage !== state.langFromLocalStorage) {
    /*const text = document.querySelector('.textarea').value;*/
    const text = state.textarea.value;
    htmlElements.body.innerHTML = '';
    createBlock(langLettersCollection[state.langFromLocalStorage]);
    /*document.querySelector('.textarea').value = text;*/
    state.textarea.value = text;
  }

  idElem.classList.add('active');
  /*state.posCaret = document.querySelector('textarea').selectionStart;*/
  state.posCaret = state.textarea.selectionStart;
});

htmlElements.body.addEventListener('keyup', (event) => {
  focusOnTextarea();
  const active = document.querySelector('.active');
  if (active) {
    active.classList.remove('active');
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    state.shiftToggle = false;
  }
});

htmlElements.textarea.addEventListener('click', getCaretPos(state.posCaret));

htmlElements.keysBlock.addEventListener('mousedown', (event) => {
  focusOnTextarea();
  state.posCaret = htmlElements.textarea.selectionStart;
  const keyIdForMouse = String(event.target.dataset.mouseId);
  if (event.target.dataset.mouseId) {
    const active = document.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }
    event.target.classList.add('active');
    if (!findEqual(keyIdForMouse, specials)) {
      if (checkSymbols(getElementIndex(keyIdForMouse, symbolsKeys))) {
        event.preventDefault();
        const index = getElementIndex(keyIdForMouse, symbolsKeys);
        const text = getKeyValueByIndex(index, symbolsValues);
        htmlElements.textarea.value += text;
        /*state.posCaret = document.querySelector('textarea').selectionStart;*/
        state.posCaret = htmlElements.textarea.selectionStart;
      } else {
        event.preventDefault();
        if (state.shiftToggle || state.capsToggle) {
          htmlElements.textarea.value += event.target.dataset.mouseId.toUpperCase();
        } else {
          htmlElements.textarea.value += event.target.dataset.mouseId;
        }

        /*state.posCaret = document.querySelector('textarea').selectionStart;*/
        state.posCaret = htmlElements.textarea.selectionStart;
      }
    }
  }
  if (event.target.dataset.mouseId === 'capslock') {
    state.capsToggle = !state.capsToggle;
  }
  if (event.target.dataset.mouseId === 'alt') {
    event.preventDefault();
    state.stack.push('alt');
    if (state.stack.length > 2) state.stack.shift();
  }
  if (event.target.dataset.mouseId === 'shift') {
    event.preventDefault();
    state.shiftToggle = true;
    state.stack.push('shift');
    if (state.stack.length > 2) state.stack.shift();
  }
});

htmlElements.keysBlock.addEventListener('mouseup', (event) => {
  event.target.classList.remove('active');
  if (event.target.dataset.mouseId === 'shift') {
    event.preventDefault();
    state.shiftToggle = false;
  }
});

/* ------------------ reset btn --------------------------- */
const reset = document.querySelector('button');
reset.addEventListener('click', () => {
  /*document.querySelector('.textarea').value = ''; */
  htmlElements.textarea.value = '';
  focusOnTextarea();
  state.posCaret = 0;
});

document.querySelector('#Backspace').addEventListener('click', () => backspaceDeletion(state.posCaret));

document.querySelector('#Delete').addEventListener('click', () => deleteDeletion(state.posCaret));

document.querySelector('#ArrowLeft').addEventListener('click', () => arrowMove(state.posCaret, htmlElements.textarea, 'left'));

document.querySelector('#ArrowRight').addEventListener('click', () => arrowMove(state.posCaret, htmlElements.textarea, 'right'));

document.querySelector('#ArrowUp').addEventListener('click', () => arrowMove(state.posCaret, htmlElements.textarea, 'up'));

document.querySelector('#ArrowDown').addEventListener('click', () => arrowMove(state.posCaret, htmlElements.textarea, 'down'));

document.querySelector('#Enter').addEventListener('click', (event) => enterKey(event));

/* ------------------- SHIFT & CAPS ------------------- */

const shiftLeft = document.querySelector('#ShiftLeft');
const shiftRight = document.querySelector('#ShiftRight');
