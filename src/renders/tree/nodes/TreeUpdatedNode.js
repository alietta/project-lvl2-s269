export default class TreeUpdatedNode {
  constructor(updatedNode) {
    this.updatedNode = updatedNode;
  }
  toString(render, level) {
    return [
      `${this.getNewKey(level, '+')}: ${render.stringify(this.updatedNode.newValue, level + 1)}`,
      `${this.getNewKey(level, '-')}: ${render.stringify(this.updatedNode.oldValue, level + 1)}`,
    ];
  }
  getNewKey(level, mode) {
    return `${' '.repeat(level * 4)}  ${mode} ${this.updatedNode.key}`;
  }
}
