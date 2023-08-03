import state from "./JS/modules/state/state.js";
import {
  createBlock,
} from "./JS/modules/create.js";
import langLetters from "./JS/langs/langLetters.js";

state.langFromLocalStorage = localStorage.getItem("langFromLocalStorage") || "ru";
createBlock(langLetters[state.langFromLocalStorage], state.isCapsOn);
