export default class TreeUnchangedNode {
  constructor(unchangedNode) {
    this.unchangedNode = unchangedNode;
  }
  toString(render, level) {
    return `${this.getNewKey(level)}: ${render.stringify(this.unchangedNode.oldValue, level + 1)}`;
  }
  getNewKey(level) {
    return `${' '.repeat(level * 4)}    ${this.unchangedNode.key}`;
  }
}
