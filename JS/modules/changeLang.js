import state from './state/state.js';
import htmlElements from './state/htmlElements.js';
import { createBlock } from './create.js';
import langLetters from '../langs/langLetters.js';

function changeLang(initialPoint) {
  function actChangeLang() {
    state.langFromLocalStorage = state.langFromLocalStorage === 'en' ? 'ru' : 'en';
    localStorage.setItem('langFromLocalStorage', `${state.langFromLocalStorage}`);
    const text = htmlElements.textarea.value;
    htmlElements.body.innerHTML = '';
    createBlock(langLetters[state.langFromLocalStorage], state.isCapsOn);
    htmlElements.textarea.value = text;
  }

  if (initialPoint === 'keyboard') {
    if (state.stack[0] === 'shift' && state.stack[1] === 'alt') {
      actChangeLang();
    }
    if (state.stack.length > 2) {
      state.stack.shift();
    }
  } else if (initialPoint === 'mouse') {
    actChangeLang();
  }

  return state.langFromLocalStorage;
}

export { changeLang };
