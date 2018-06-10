import TreeNodeRenderer from './TreeNodeRenderer';

export default class TreeAddedNode extends TreeNodeRenderer {
  toString(level) {
    return `${this.getNewKey(level, '+')}: ${this.stringify(this.node.newValue, level + 1)}`;
  }
}
