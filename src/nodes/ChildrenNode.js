export default class ChildrenNode {
  constructor(key, children) {
    this.key = key;
    this.children = children;
  }
  getPlainText() {
    return this.mode;
  }
  getMode = () => ' ';
}
