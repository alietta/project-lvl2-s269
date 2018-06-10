export default class JsonNodeRenderer {
  constructor(node) {
    this.node = node;
  }
  getNewKey(level, mode = ' ') {
    return `${' '.repeat(level * 4)}  ${mode} ${this.node.key}`;
  }
  getPadding = level => ' '.repeat(level * 4);
}
