import TreeNodeRenderer from './TreeNodeRenderer';

export default class TreeChildrenNode extends TreeNodeRenderer {
  toString(level, render) {
    return `${this.getNewKey(level)}: ${render(this.node.children, level + 1)}`;
  }
}
