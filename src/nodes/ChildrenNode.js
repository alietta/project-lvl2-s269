export default class ChildrenNode {
  constructor(key, children) {
    this.key = key;
    this.children = children;
    this.mode = ' ';
  }
  getPlainText() {
    return this.mode;
  }
}
