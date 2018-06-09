export default class AddedNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.children = null;
  }
  getPlainText(key, getTextValue) {
    return `Property '${key}' was added with ${getTextValue(this.value)}`;
  }
  getMode = () => '+';
}
