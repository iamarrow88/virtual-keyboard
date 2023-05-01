import {focusOnTextarea} from "./cursorMoving.js";
import state from "./state/state.js";
import htmlElements from "./state/htmlElements.js";
import {createBlock} from "./create.js";
import langLetters from "../langs/langLetters.js";
import {checkSymbols, findEqual, getElementIndex, getKeyValueByIndex} from "./clearSpecials.js";


function mouseDown(event) {
    focusOnTextarea();
    /*state.posCaret = htmlElements.textarea.selectionStart;*/
    const keyIdForMouse = event.target.dataset.mouseId;
    console.log(keyIdForMouse);
    console.log(event.target.dataset.mouseId);

    if (event.target.dataset.mouseId) {
        const active = document.querySelector('.active');
        if (active) active.classList.remove('active');

        event.target.classList.add('active');
        if (!findEqual(keyIdForMouse, langLetters.specials)) {
            if (checkSymbols(getElementIndex(keyIdForMouse, langLetters.symbolsKeys))) {
                event.preventDefault();
                const index = getElementIndex(keyIdForMouse, langLetters.symbolsKeys);
                const text = getKeyValueByIndex(index, langLetters.symbolsValues);
                htmlElements.textarea.value += text;
                state.posCaret = htmlElements.textarea.selectionStart;
            } else {
                event.preventDefault();
                if (state.isCapsOn || state.capsToggle) {
                    htmlElements.textarea.value += event.target.dataset.mouseId.toUpperCase();
                } else {
                    htmlElements.textarea.value += event.target.dataset.mouseId;
                }
                state.posCaret = htmlElements.textarea.selectionStart;
            }
        }
    }
    if (event.target.dataset.mouseId === 'capslock') {
        console.log('capslock');
        createBlock(langLetters[state.langFromLocalStorage], state.isCapsOn);
        state.capsToggle = !state.capsToggle;
    }

    if (event.target.dataset.mouseId === 'alt') {
        event.preventDefault();
        if (state.stack.length > 2) state.stack.shift();
    }

    if (event.target.dataset.mouseId === 'shift') {
        event.preventDefault();
        state.isCapsOn = true;
        /*console.log(state);*/

        if (state.stack.length > 2) state.stack.shift();
    }
}

function mouseUp(event){
    event.target.classList.remove('active');
    if (event.target.dataset.mouseId === 'shift') {
        event.preventDefault();
        state.isCapsOn = false;
    }
}

export {mouseDown, mouseUp}