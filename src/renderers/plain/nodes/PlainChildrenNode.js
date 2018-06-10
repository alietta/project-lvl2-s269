export default class PlainChildrenNode {
  constructor(childrenNode) {
    this.childrenNode = childrenNode;
  }
  toString(level, render) {
    return `${render(this.childrenNode.children, `${level}${this.childrenNode.key}.`)}`;
  }
}
