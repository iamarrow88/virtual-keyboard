function changeLang(stack, langFromLocalStorage) {
  if (stack[0] === 'shift' && stack[1] === 'alt') {
    if (langFromLocalStorage === 1) {
      langFromLocalStorage = 0;
    } else {
      langFromLocalStorage = 1;
    }
    localStorage.setItem('langFromLocalStorage', `${langFromLocalStorage}`);
  }
  if (stack.length > 2) {
    stack.shift();
  }
  return langFromLocalStorage;
}
