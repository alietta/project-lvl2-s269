export default class TreeDeletedNode {
  constructor(deletedNode) {
    this.deletedNode = deletedNode;
  }
  toString(render, level) {
    return `${this.getNewKey(level)}: ${render.stringify(this.deletedNode.oldValue, level + 1)}`;
  }
  getNewKey(level) {
    return `${' '.repeat(level * 4)}  - ${this.deletedNode.key}`;
  }
}
