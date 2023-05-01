import {
  createBlock,
} from './JS/modules/create.js';
import en from './JS/langs/en.js';
import ru from './JS/langs/ru.js';
import {
  specials,
  values,
  keys,
} from './JS/langs/specialKeys.js';
import {
  findEqual,
  getElementIndex,
  checkSymbols,
  substitution,
} from './JS/modules/clearSpecials.js';
// eslint-disable-next-line import/no-cycle
import {
  backspaceDeletion,
  deleteDeletion,
} from './JS/modules/deletion.js';

// eslint-disable-next-line import/no-cycle
import {
  arrowMove,
  arrowR,
  arrowU,
  arrowD,
  enterKey,
}
  from './JS/modules/linesNavigation.js';
import {focusOn, getCaretPos} from './JS/modules/cursorMoving.js';

const langLettersCollection = [en, ru];

let langFromLocalStorage = localStorage.getItem('langFromLocalStorage') || 0;
let shiftToggle = false;
let capsToggle = false;

const keysBlock = document.querySelector('.col');
const textarea = document.querySelector('.textarea');

createBlock(langLettersCollection[langFromLocalStorage]);

const body = document.querySelector('body');
let posCaret = 0;
const stack = [];

body.addEventListener('keydown', (event) => {
  focusOn(textarea);
  posCaret = textarea.selectionStart;
  const idElem = document.querySelector(`#${event.code}`);
  if (event.code === 'CapsLock'){
    if (capsToggle){
      capsToggle = false;
    } else {
      capsToggle = true;
    }
  }
  if (event.code === 'AltLeft' || event.code === 'AltRight') {
    event.preventDefault();
    stack.push('alt');
    if (stack.length > 2) {
      stack.shift();
    }
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    shiftToggle = true;
    stack.push('shift');
    if (stack.length > 2) {
      stack.shift();
    }
  }
  const newLangFromLocalStorage = langFromLocalStorage;
  langFromLocalStorage = changeLang();
  if (newLangFromLocalStorage !== langFromLocalStorage) {
    const text = document.querySelector('.textarea').value;
    body.innerHTML = '';
    createBlock(langLettersCollection[langFromLocalStorage]);
    document.querySelector('.textarea').value = text;
  }

  idElem.classList.add('active');
  posCaret = document.querySelector('textarea').selectionStart;
});

body.addEventListener('keyup', (event) => {
  focusOn(textarea);
  const active = document.querySelector('.active');
  if (active) {
    active.classList.remove('active');
  }
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    shiftToggle = false;
  }
});



textarea.addEventListener('click', getCaretPos(posCaret));

keysBlock.addEventListener('mousedown', (event) => {
  focusOn(textarea);
  posCaret = textarea.selectionStart;
  const ident = String(event.target.dataset.mouseId);
  if (event.target.dataset.mouseId) {
    const active = document.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }
    event.target.classList.add('active');
    if (!findEqual(ident, specials)) {
      if (checkSymbols(getElementIndex(ident, keys))) {
        event.preventDefault();
        const index = getElementIndex(ident, keys);
        const text = substitution(index, values);
        textarea.value += text;
        posCaret = document.querySelector('textarea').selectionStart;
      } else {
        event.preventDefault();
        if (shiftToggle || capsToggle){
          textarea.value += event.target.dataset.mouseId.toUpperCase();
        } else {
          textarea.value += event.target.dataset.mouseId;
        }

        posCaret = document.querySelector('textarea').selectionStart;
      }
    }
  }
  if (event.target.dataset.mouseId === 'capslock'){
    if (capsToggle){
      capsToggle = false;
    } else {
      capsToggle = true;
    }
  }
  if (event.target.dataset.mouseId === 'alt') {
    event.preventDefault();
    stack.push('alt');
    if (stack.length > 2) {
      stack.shift();
    }
  }
  if (event.target.dataset.mouseId === 'shift') {
    event.preventDefault();
    shiftToggle = true;
    stack.push('shift');
    if (stack.length > 2) {
      stack.shift();
    }
  }
});

keysBlock.addEventListener('mouseup', (event) => {
  event.target.classList.remove('active');
  if (event.target.dataset.mouseId === 'shift') {
    event.preventDefault();
    shiftToggle = false;
  }
});

/* ------------------ reset btn --------------------------- */
const reset = document.querySelector('button');
reset.addEventListener('click', () => {
  document.querySelector('.textarea').value = '';
  focusOn(textarea);
  posCaret = 0;
});

const backspace = document.querySelector('#Backspace');
backspace.addEventListener('click', () => backspaceDeletion(posCaret));

const del = document.querySelector('#Delete');
del.addEventListener('click', () => deleteDeletion(posCaret));

const leftArrow = document.querySelector('#ArrowLeft');
leftArrow.addEventListener('click', () => arrowL(posCaret));

const rigthArrow = document.querySelector('#ArrowRight');
rigthArrow.addEventListener('click', () => arrowR(posCaret));

const upArrow = document.querySelector('#ArrowUp');
upArrow.addEventListener('click', () => arrowU(posCaret));

const downArrow = document.querySelector('#ArrowDown');
downArrow.addEventListener('click', () => arrowD(posCaret));

const enter = document.querySelector('#Enter');
enter.addEventListener('click', (event) => enterKey(event));


/* ------------------- SHIFT & CAPS ------------------- */

const shiftLeft = document.querySelector('#ShiftLeft');
const shiftRight = document.querySelector('#ShiftRight');


