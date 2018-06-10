export default class JsonUnchangedNode {
  constructor(node) {
    this.node = node;
  }
  makeNodeObject() {
    return { [`${this.node.key}`]: { unchangedValue: this.node.oldValue } };
  }
}
