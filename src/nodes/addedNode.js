import Node from './nodes';

export default class AddedNode extends Node {
  constructor(key, value) {
    super(key);
    this.value = value;
  }
  toString(level) {
    return `${this.getNewKey(level, '+')}: ${this.stringify(this.value, level + 1)}`;
  }
}
