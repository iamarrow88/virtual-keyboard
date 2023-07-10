export function findEqual(elem, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      return true;
    }
  }
  return false;
}

export function getElementIndex(elem, arrayOfKeys) {
  return arrayOfKeys.indexOf(elem);
}

export function checkSymbols(index) {
  return index > -1;
}

export function getKeyValueByIndex(index, values) {
  return values[index];
}
