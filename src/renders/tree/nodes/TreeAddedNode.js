export default class TreeAddedNode {
  constructor(addedNode) {
    this.addedNode = addedNode;
  }
  toString(render, level) {
    return `${this.getNewKey(level)}: ${render.stringify(this.addedNode.newValue, level + 1)}`;
  }
  getNewKey(level) {
    return `${' '.repeat(level * 4)}  + ${this.addedNode.key}`;
  }
}
