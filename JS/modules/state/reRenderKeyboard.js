import htmlElements from "./htmlElements.js";
import {createBlock} from "../create.js";
import langLetters from "../../langs/langLetters.js";
import state from "./state.js";

export default function (){
    const text = htmlElements.textarea.value;
    htmlElements.body.innerHTML = '';
    createBlock(langLetters[state.langFromLocalStorage], state.isCapsOn);
    htmlElements.textarea.value = text;
}