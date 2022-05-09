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
    this.isFnKey = Boolean(small.match(/Ctrl|↑|↓|→|←|Alt|Shift|Tab|Back|Del|Enter|Caps|Win/));
    if (this.isFnKey) {
      this.div.classList.add('fn-key');
    }
    this.div.dataset.key = this.keycode;
    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.sup = create('div', 'sup', this.div, shift);
    } else {
      this.sup = create('div', 'sup', this.div, '');
    }
    this.char = create('div', 'char', this.div, small);
  }
}
