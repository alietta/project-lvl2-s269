export default class UnchangedNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.children = null;
  }
  getPlainText = key => `Property '${key}' was unchanged`;
  getMode = () => ' ';
}