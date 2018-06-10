export default class JsonUpdatedNode {
  constructor(node) {
    this.node = node;
  }
  makeNodeObject() {
    return { [`${this.node.key}`]: { addedValue: this.node.newValue, deletedValue: this.node.oldValue } };
  }
}
