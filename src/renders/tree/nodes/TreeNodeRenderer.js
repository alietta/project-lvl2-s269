export default class TreeNodeRenderer {
  constructor(node) {
    this.node = node;
  }
  getNewKey(level, mode = ' ') {
    return `${' '.repeat(level * 4)}  ${mode} ${this.node.key}`;
  }
  getPadding = level => ' '.repeat(level * 4);
  stringify = (body, level) => {
    if (body instanceof Object) {
      return JSON.stringify(body, null, '\t')
        .replace(/\t+/g, this.getPadding(level + 1))
        .replace(/"/g, '')
        .replace(/\}/g, `${this.getPadding(level)}}`);
    }
    return body;
  };
}
