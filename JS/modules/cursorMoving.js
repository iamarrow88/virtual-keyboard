export function focusOn(textarea) {
    textarea.focus();
}

export function getCaretPos(posCaret) {
    posCaret = document.querySelector('.textarea').selectionStart;
    console.log(posCaret);
    return posCaret;
}



