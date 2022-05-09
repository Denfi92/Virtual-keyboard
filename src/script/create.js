export default function create(tag, className, parent, textContent) {
  const elem = document.createElement(tag);
  if (className) elem.classList.add(className);
  if (parent) parent.append(elem);
  if (textContent) elem.textContent = textContent;
  return elem;
}
