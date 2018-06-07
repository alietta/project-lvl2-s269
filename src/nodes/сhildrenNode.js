import Node from './nodes';

export default class ChildrenNode extends Node {
  constructor(key, children) {
    super(key);
    this.children = children;
  }
  toString(level, render) {
    return `${this.getNewKey(level)}: ${render(this.children, level + 1)}`;
  }
}
