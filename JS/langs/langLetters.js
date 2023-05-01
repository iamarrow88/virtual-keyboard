import en from './en.js';
import ru from './ru.js';

const symbols = {
    backquote: '`',
    minus: '-',
    equal: '=',
    bracketleft: '[',
    bracketright: ']',
    backslash: '\\',
    semicolon: ';',
    quote: "'",
    comma: ',',
    period: '.',
    slash: '/',
    space: ' ',
    tab: '  ',
};

const specials = [
    'backspace',
    'del',
    'capslock',
    'enter',
    'shift',
    'control',
    'meta',
    'alt',
    'arrowup',
    'arrowdown',
    'arrowleft',
    'arrowright'
];

const symbolsKeys = Object.keys(symbols);
const symbolsValues = Object.values(symbols);

export default {
    en: en,
    ru: ru,
    symbols: symbols,
    specials: specials,
    symbolsKeys: symbolsKeys,
    symbolsValues: symbolsValues
};