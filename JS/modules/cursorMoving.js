import htmlElements from "./state/htmlElements.js";
import state from "./state/state.js";

export function focusOnTextarea() {
  htmlElements.textarea.focus();
}

export function getCaretPos() {
  state.posCaret = htmlElements.textarea.selectionStart;
  return state.posCaret;
}
