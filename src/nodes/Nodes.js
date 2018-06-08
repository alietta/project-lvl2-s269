export default class Node {
  constructor(key) {
    this.key = key;
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
  getNewKey = (level, mode = ' ') => `${this.getPadding(level)}  ${mode} ${this.key}`;
}
