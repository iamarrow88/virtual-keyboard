import { focusOn, getCaretPos } from './cursorMoving.js';

/* const textarea = ; */

export function backspaceDeletion(posCaret) {
  focusOn();
  getCaretPos();
  const input = document.querySelector('textarea');
  const text = input.value;
  const res = text.slice(0, -1);
  if (posCaret > 0) {
    --posCaret;
  }
  document.querySelector('.textarea').value = res;
  console.log(posCaret);
  console.log(res);
  return posCaret;
}

export function deleteDeletion(posCaret) {
  focusOn();
  posCaret = getCaretPos();
  const input = document.querySelector('textarea');
  const text = input.value.split('');
  text.splice(posCaret, 1);
  if (posCaret > 0) {
    posCaret -= 1;
  }
  document.querySelector('.textarea').value = text.join('');
  console.log(text.join(''));
  console.log(posCaret);
}
