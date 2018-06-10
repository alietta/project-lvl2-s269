export default class JsonAddedNode {
  constructor(node) {
    this.node = node;
  }
  makeNodeObject() {
    return { [`${this.node.key}`]: { addedValue: this.node.newValue } };
  }
}
