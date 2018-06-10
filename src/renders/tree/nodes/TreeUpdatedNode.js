import TreeNodeRenderer from './TreeNodeRenderer';

export default class TreeUpdatedNode extends TreeNodeRenderer {
  toString(level) {
    return [
      `${this.getNewKey(level, '+')}: ${this.stringify(this.node.newValue, level + 1)}`,
      `${this.getNewKey(level, '-')}: ${this.stringify(this.node.oldValue, level + 1)}`,
    ];
  }
}
