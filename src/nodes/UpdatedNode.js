import Node from './Nodes';

export default class UpdatedNode extends Node {
  constructor(key, first, second) {
    super(key);
    this.first = first;
    this.second = second;
  }
  toString(level) {
    return [
      `${this.getNewKey(level, '+')}: ${this.stringify(this.second, level + 1)}`,
      `${this.getNewKey(level, '-')}: ${this.stringify(this.first, level + 1)}`,
    ];
  }
}
