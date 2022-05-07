import create from './create';

export default class Key {
  constructor({
    code, shift, small, keycode,
  }) {
    this.small = small;
    this.shift = shift;
    this.code = code;
    this.keycode = keycode;
    this.div = create('div', 'keyboard-key');
    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.sub = create('div', 'sub', this.div, shift);
    } else {
      this.sub = create('div', 'sub', this.div, '');
    }
    this.letter = create('div', 'letter', this.div, small);
    this.isFnKey = Boolean(small.match(/Ctrl|↑|↓|→|←|Alt|Shift|Tab|Back|Del|Enter|Caps|Win/));
    if (this.isFnKey) {
      this.letter.classList.add('fn-key');
      this.letter.dataset.isFnKey = 'true';
    }
  }
}
