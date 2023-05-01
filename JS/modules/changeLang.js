import state from "./state/state.js";

export default function () {
  if (state.stack[0] === 'shift' && state.stack[1] === 'alt') {
    state.langFromLocalStorage = +state.langFromLocalStorage === 1 ? 0 : 1;
    localStorage.setItem('langFromLocalStorage', `${state.langFromLocalStorage}`);
  }
  if (state.stack.length > 2) {
    state.stack.shift();
  }
  return state.langFromLocalStorage;
}
