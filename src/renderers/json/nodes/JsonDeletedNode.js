export default class JsonDeletedNode {
  constructor(node) {
    this.node = node;
  }
  makeNodeObject() {
    return { [`${this.node.key}`]: { deletedValue: this.node.oldValue } };
  }
}
