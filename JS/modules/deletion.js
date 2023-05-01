import { focusOnTextarea, getCaretPos } from './cursorMoving.js';
import htmlElements from './state/htmlElements.js';
import state from "./state/state.js";

export function backspaceDeletion() {
  focusOnTextarea();
  getCaretPos();
  const text = htmlElements.textarea.value;
  const res = text.slice(0, -1);
  if (state.posCaret > 0) {
    --state.posCaret;
  }
  htmlElements.textarea.value = res;
  return state.posCaret;
}

export function deleteDeletion() {
  focusOnTextarea();
  state.posCaret = getCaretPos();
  const text = htmlElements.textarea.value.split('');
  if (state.posCaret > 0) {
    state.posCaret -= 1;
    text.splice(state.posCaret, 1);
  }
  htmlElements.textarea.value = text.join('');
}
