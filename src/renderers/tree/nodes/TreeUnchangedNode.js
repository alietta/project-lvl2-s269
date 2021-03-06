import TreeNodeRenderer from './TreeNodeRenderer';

export default class TreeUnchangedNode extends TreeNodeRenderer {
  toString(level) {
    return `${this.getNewKey(level)}: ${this.stringify(this.node.oldValue, level + 1)}`;
  }
}
