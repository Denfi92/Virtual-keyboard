import './styles/scss.css';
import Keyboard from './script/keyboard';

function get(name, value = null) {
  return JSON.parse(window.localStorage.getItem(name) || value);
}

const lang = get('Lang', '"ru"');

new Keyboard().draw(lang).createKeyboard();
