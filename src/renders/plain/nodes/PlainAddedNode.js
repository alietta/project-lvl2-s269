export default class PlainAddedNode {
  constructor(addedNode) {
    this.addedNode = addedNode;
  }
  toString(level) {
    return `Property '${level}${this.addedNode.key}' was added with ${this.getTextValue()}`;
  }
  getTextValue() {
    if (this.addedNode.newValue instanceof Object) {
      return 'complex value';
    }
    return `${this.addedNode.newValue}`;
  }
}
