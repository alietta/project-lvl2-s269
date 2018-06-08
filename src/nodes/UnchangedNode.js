import Node from './Nodes';

export default class UnchangedNode extends Node {
  constructor(key, value) {
    super(key);
    this.value = value;
  }
  toString(level) {
    return `${this.getNewKey(level)}: ${this.stringify(this.value, level + 1)}`;
  }
}
