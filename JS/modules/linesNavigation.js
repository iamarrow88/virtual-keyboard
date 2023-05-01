import { focusOnTextarea, getCaretPos } from './cursorMoving.js';
import state from "./state/state.js";
import htmlElements from './state/htmlElements.js';


export function arrowMove(direction) {
  focusOnTextarea();
  state.posCaret = getCaretPos();
  if(direction === 'left') {
    console.log('press left');
    --state.posCaret;
  } else if (direction === 'right') {
    console.log('press right');
    ++state.posCaret;
  } else if (direction === 'up') {
    console.log('press up');
    if(state.posCaret > 70) {
      state.posCaret -= 70;
    }
  } else if (direction === 'down') {
    console.log('press down');
    if (state.posCaret < htmlElements.textarea.value.length) {
      state.posCaret += 70;
    }
  }
  console.log(state.posCaret);
  document.querySelector('textarea').setSelectionRange(state.posCaret, state.posCaret);
  return state.posCaret;
}

/*export function arrowR(posCaret, textarea, direction) {
  focusOn(textarea);
  posCaret = getCaretPos();
  ++posCaret;
  console.log(posCaret);
  document.querySelector('textarea').setSelectionRange(posCaret, posCaret);
  return posCaret;
}*/

/*export function arrowU(posCaret, textarea, direction) {
  focusOn(textarea);
  posCaret = getCaretPos();
  if (posCaret > 70) {
    posCaret -= 70;
  }
  console.log(posCaret);
  document.querySelector('textarea').setSelectionRange(posCaret, posCaret);
  return posCaret;
}*/

/*export function arrowD(posCaret, textarea, direction) {
  focusOn(textarea);
  posCaret = getCaretPos();
  if (posCaret < document.querySelector('.textarea').value.length) {
    posCaret += 70;
  }
  document.querySelector('textarea').setSelectionRange(posCaret, posCaret);
  return posCaret;
}*/

export function enterKey(event, posCaret) {
  focusOnTextarea();
  event.preventDefault();
  event.stopPropagation();
  document.querySelector('textarea').focus();
  const selectionStart = document.querySelector('.textarea').selectionStart;
  const text = document.querySelector('textarea').value;
  console.log(text);
  console.log(selectionStart);
  posCaret = document.querySelector('.textarea').selectionStart;

  console.log(posCaret);
  const startText = text.substring(0, posCaret);
  const endText = text.substring(posCaret, text.length);
  console.log(startText);
  console.log(endText);
  posCaret = document.querySelector('textarea').selectionStart;
  document.querySelector('textarea').value = `${startText}\n${endText}`;
  return posCaret;
}
