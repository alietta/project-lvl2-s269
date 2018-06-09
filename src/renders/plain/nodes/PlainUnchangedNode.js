export default class PlainUnchangedNode {
  constructor(unchangedNode) {
    this.unchangedNode = unchangedNode;
  }
  toString(level) {
    return `Property '${level}${this.unchangedNode.key}' was unchanged`;
  }
}
