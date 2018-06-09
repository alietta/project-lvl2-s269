export default class TreeChildrenNode {
  constructor(childrenNode) {
    this.childrenNode = childrenNode;
  }
  toString(render, level) {
    return `${this.getNewKey(level)}: ${render.render(this.childrenNode.children, level + 1)}`;
  }
  getNewKey(level) {
    return `${' '.repeat(level * 4)}    ${this.childrenNode.key}`;
  }
}
