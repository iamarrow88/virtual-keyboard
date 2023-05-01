import { focusOnTextarea, getCaretPos } from './cursorMoving.js';
import state from "./state/state.js";
import htmlElements from './state/htmlElements.js';


export function arrowMove(direction) {
  focusOnTextarea();
  state.posCaret = getCaretPos();
  if(direction === 'left') {
    --state.posCaret;
  } else if (direction === 'right') {
    ++state.posCaret;
  } else if (direction === 'up') {
    if(state.posCaret > 70) {
      state.posCaret -= 70;
    }
  } else if (direction === 'down') {
    if (state.posCaret < htmlElements.textarea.value.length) {
      state.posCaret += 70;
    }
  }
  htmlElements.textarea.setSelectionRange(state.posCaret, state.posCaret);
  return state.posCaret;
}

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
