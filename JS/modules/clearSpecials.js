import {symbols, specials} from '../langs/specialKeys.js';

export function findEqual(elem, arr){
  for (let i = 0; i < arr.length; i++){
    if(arr[i] === elem){
      return true;
    }
  }
  return false;
}

export function getElementIndex(elem, arrayOfKeys){
  let index = arrayOfKeys.indexOf(elem);
  return index;
}

export function checkSymbols(index){
  if(index > -1){
    return true;
  } else {
    return false
  }
};

export function substitution(index, values){
  let elem = values[index];
  return elem;
};