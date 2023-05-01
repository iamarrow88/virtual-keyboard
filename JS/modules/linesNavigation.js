import {focusOn, getCaretPos} from './cursorMoving.js';

export function arrowMove(posCaret, textarea, direction){
  focusOn(textarea);
  posCaret = getCaretPos();
  --posCaret;
  console.log(posCaret);
  document.querySelector('textarea').setSelectionRange(posCaret,posCaret);
  return posCaret;
}

export function arrowR(posCaret, textarea, direction){
  focusOn(textarea);
  posCaret = getCaretPos();
  ++posCaret;
  console.log(posCaret);
  document.querySelector('textarea').setSelectionRange(posCaret,posCaret);
  return posCaret;
}


export function arrowU(posCaret, textarea, direction){
  focusOn(textarea);
  posCaret = getCaretPos();
  if (posCaret > 70){
    posCaret = posCaret - 70;
  }
  console.log(posCaret);
  document.querySelector('textarea').setSelectionRange(posCaret,posCaret);
  return posCaret;
}

export function arrowD(posCaret, textarea, direction){
  focusOn(textarea);
  posCaret = getCaretPos();
  if (posCaret < document.querySelector('.textarea').value.length) {
    posCaret = posCaret + 70;
  }
  document.querySelector('textarea').setSelectionRange(posCaret,posCaret);
  return posCaret;
}

export function enterKey(event, posCaret, textarea){
  focusOn(textarea);
  event.preventDefault();
  event.stopPropagation();
  document.querySelector('textarea').focus();
  let a = document.querySelector('.textarea').selectionStart;
  let text = document.querySelector('textarea').value;
  console.log(text);
  console.log(a);
  posCaret = document.querySelector('.textarea').selectionStart;
  
  console.log(posCaret);
  let startText = text.substring(0, posCaret);
  let endText = text.substring(posCaret, text.length);
  console.log(startText);
  console.log(endText);
  posCaret = document.querySelector('textarea').selectionStart;
  document.querySelector('textarea').value = startText + '\n' + endText;
  return posCaret;
}