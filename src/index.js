import './styles/scss.css';
import language from './script/language/language';
import create from './script/create';
import Key from './script/keys';

const keyboardKeys = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

document.body.prepend(create('div', 'wrapper'));
const wrapper = document.querySelector('.wrapper');
create('h1', 'title', wrapper, 'Virtual Keyboard');
create('p', 'subtitle', wrapper, 'Windows Keyboard');

function get(name, value = null) {
  return JSON.parse(window.localStorage.getItem(name) || value);
}

function set(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}
class Keyboard {
  constructor() {
    this.isCaps = false;
    this.keysPressed = {};
  }

  draw(langType) {
    this.keyBase = language[langType];
    this.textarea = create('textarea', 'textarea', wrapper);
    this.textarea.setAttribute('placeholder', 'Start typing!');
    this.textarea.setAttribute('rows', '10');
    this.textarea.setAttribute('cols', '50');
    create('p', 'hint', wrapper, 'Use left Ctrl+Alt to switch language');
    wrapper.append(this.textarea);
    this.textarea.focus();
    this.keyboard = create('div', 'keyboard', wrapper);
    this.keyboard.setAttribute('data-language', langType);
    return this;
  }

  createKeyboard() {
    this.keys = [];
    keyboardKeys.forEach((row) => {
      const keyboardRow = create('div', 'keyboard-row', this.keyboard);
      row.forEach((code) => {
        const newKey = this.keyBase.find((key) => key.code === code);
        const keyBtn = new Key(newKey);
        this.keys.push(keyBtn);
        keyboardRow.append(keyBtn.div);
      });
      this.keyboard.append(keyboardRow);
    });
    document.addEventListener('keydown', this.keyPress);
    document.addEventListener('keyup', this.keyPress);
    this.keyboard.onmousedown = this.mouseEvent;
    this.keyboard.onmouseup = this.mouseEvent;
  }

  mouseEvent = (e) => {
    e.stopPropagation();
    const key = e.target.closest('.keyboard-key');
    if (e.type.match(/down/)) {
      key.classList.add('pressing');
    }
    if (e.type.match(/up/)) {
      key.classList.remove('pressing');
    }
    if (!key) return;
    const { dataset: { code } } = key;
    this.keyPress({ code, type: e.type });
  };

  keyPress = (e) => {
    const { code, type } = e;
    const keyButton = this.keys.find((elem) => elem.code === code);
    this.textarea.focus();
    if (!keyButton) return;
    if (type.match(/keydown|mousedown/)) {
      if (!type.match(/mouse/)) e.preventDefault();
      if (code.match(/Shift/)) this.shiftKey = true;
      if (this.shiftKey) this.switchUpperCase(true);
      if (code.match(/Control|Alt|Caps/) && e.repeat) return;
      if (code.match(/Control/)) this.ctrKey = true;
      if (code.match(/Alt/)) this.altKey = true;
      keyButton.div.classList.add('pressing');
      if (code.match(/Caps/) && !this.isCaps) {
        this.isCaps = true;
        this.switchUpperCase(true);
      } else if (code.match(/Caps/) && this.isCaps) {
        this.isCaps = false;
        this.switchUpperCase(false);
        keyButton.div.classList.remove('pressing');
      }
      this.keysPressed[keyButton.code] = keyButton;
    } else if (e.type.match(/keyup|mouseup/)) {
      if (code.match(/Shift/)) {
        this.shiftKey = false;
        this.switchUpperCase(false);
      }
      if (code.match(/Control/)) this.ctrKey = false;
      if (code.match(/Alt/)) this.altKey = false;
      if (!code.match(/Caps/)) keyButton.div.classList.remove('pressing');
    }
  };

  switchUpperCase(isTrue) {
    if (isTrue) {
      this.keys.forEach((button) => {
        if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sup.innerHTML) {
          button.char.innerHTML = button.shift;
        } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
          button.char.innerHTML = button.small;
        } else if (!button.isFnKey && !button.sup.innerHTML) {
          button.char.innerHTML = button.shift;
        }
      });
    } else {
      this.keys.forEach((button) => {
        if (button.sup.innerHTML && !button.isFnKey) {
          if (!this.isCaps) {
            button.char.innerHTML = button.small;
          } else if (!this.isCaps) {
            button.char.innerHTML = button.shift;
          }
        } else if (!button.isFnKey) {
          if (this.isCaps) {
            button.char.innerHTML = button.shift;
          } else {
            button.char.innerHTML = button.small;
          }
        }
      });
    }
  }
}

const lang = get('Lang', '"ru"');
new Keyboard(keyboardKeys).draw(lang).createKeyboard();
