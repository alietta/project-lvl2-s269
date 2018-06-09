export default class PlainDeletedNode {
  constructor(deletedNode) {
    this.deletedNode = deletedNode;
  }
  toString(level) {
    return `Property '${level}${this.deletedNode.key}' was removed`;
  }
}
