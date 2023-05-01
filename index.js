import state from "./JS/modules/state/state.js";
import htmlElements from './JS/modules/state/htmlElements.js'
import {
  createBlock,
} from './JS/modules/create.js';

import langLetters from "./JS/langs/langLetters.js";

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
import {keyDown, keyUp} from './JS/modules/writeLetterKeyboard.js'
import {mouseDown, mouseUp} from "./JS/modules/writeLetterMouse.js";
state.langFromLocalStorage = localStorage.getItem('langFromLocalStorage') || 'ru';

createBlock(langLetters[state.langFromLocalStorage], state.isCapsOn);

htmlElements.keysBlock = document.querySelector('.col');
htmlElements.textarea.addEventListener('click', getCaretPos);
htmlElements.body.addEventListener('keydown', keyDown);
htmlElements.body.addEventListener('keyup', keyUp);

htmlElements.keysBlock.addEventListener('mousedown', mouseDown);
htmlElements.keysBlock.addEventListener('mouseup', mouseUp);


/* ------------------ reset btn --------------------------- */
const reset = document.querySelector('button');
reset.addEventListener('click', () => {
  htmlElements.textarea.value = '';
  focusOnTextarea();
  state.posCaret = 0;
});

document.querySelector('#Backspace').addEventListener('click', () => backspaceDeletion(state.posCaret));

document.querySelector('#Delete').addEventListener('click', () => deleteDeletion(state.posCaret));

document.querySelector('#ArrowLeft').addEventListener('click', () => arrowMove('left'));

document.querySelector('#ArrowRight').addEventListener('click', () => arrowMove('right'));

document.querySelector('#ArrowUp').addEventListener('click', () => arrowMove('up'));

document.querySelector('#ArrowDown').addEventListener('click', () => arrowMove('down'));

document.querySelector('#Enter').addEventListener('click', (event) => enterKey(event));

/* ------------------- SHIFT & CAPS ------------------- */

const shiftLeft = document.querySelector('#ShiftLeft');
const shiftRight = document.querySelector('#ShiftRight');
