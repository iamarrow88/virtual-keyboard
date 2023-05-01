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
    /*if(state.line !== 0){

    }*/
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

export function enterKey(event) {
  focusOnTextarea();
  event.preventDefault();
  event.stopPropagation();
  htmlElements.textarea.focus();
  const text = htmlElements.textarea.value;
  state.posCaret = htmlElements.textarea.selectionStart;

  const startText = text.substring(0, state.posCaret);
  const endText = text.substring(state.posCaret, text.length);
  state.posCaret = htmlElements.textarea.selectionStart;
  document.querySelector('textarea').value = `${startText}\n${endText}`;
  return state.posCaret;
}
