import htmlElements from './state/htmlElements.js'
import {focusOnTextarea, getCaretPos} from "./cursorMoving.js";
import {keyDown, keyUp} from "./writeLetterKeyboard.js";
import {mouseDown, mouseUp} from "./writeLetterMouse.js";
import state from "./state/state.js";
import {backspaceDeletion, deleteDeletion} from "./deletion.js";
import {arrowMove, enterKey} from "./linesNavigation.js";

export default function (){
    htmlElements.keysBlock = document.querySelector('.col');
    const reset = document.querySelector('button');


    htmlElements.textarea.addEventListener('click', getCaretPos);
    htmlElements.body.addEventListener('keydown', keyDown);
    htmlElements.body.addEventListener('keyup', keyUp);

    htmlElements.keysBlock.addEventListener('mousedown', mouseDown);
    htmlElements.keysBlock.addEventListener('mouseup', mouseUp);

    reset.addEventListener('click', () => {
        htmlElements.textarea.value = '';
        focusOnTextarea();
        state.posCaret = 0;
    });

    document.querySelector('#Backspace').addEventListener('click', () => backspaceDeletion(state.posCaret));

    document.querySelector('#Delete').addEventListener('click', () => deleteDeletion(state.posCaret));

    document.querySelector('#ArrowLeft').addEventListener('click', () => arrowMove('left'));

    document.querySelector('#ArrowRight').addEventListener('click', () => arrowMove('right'));

    document.querySelector('#ArrowUp').addEventListener('click', () => arrowMove('up'));

    document.querySelector('#ArrowDown').addEventListener('click', () => arrowMove('down'));

    document.querySelector('#Enter').addEventListener('click', (event) => enterKey(event));

}
