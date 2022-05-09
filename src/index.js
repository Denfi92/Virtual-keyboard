/* eslint-disable no-unused-vars */
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
}

const lang = get('Lang', '"ru"');
new Keyboard(keyboardKeys).draw(lang).createKeyboard();
