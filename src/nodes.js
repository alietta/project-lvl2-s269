class Node {
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
export class ChildrenNode extends Node {
  constructor(key, children) {
    super(key);
    this.children = children;
  }
  toString(level, render) {
    return `${this.getNewKey(level)}: ${render(this.children, level + 1)}`;
  }
}
export class UnchangedNode extends Node {
  constructor(key, value) {
    super(key);
    this.value = value;
  }
  toString(level) {
    return `${this.getNewKey(level)}: ${this.stringify(this.value, level + 1)}`;
  }
}
export class UpdatedNode extends Node {
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
export class DeletedNode extends Node {
  constructor(key, value) {
    super(key);
    this.value = value;
  }
  toString(level) {
    return `${this.getNewKey(level, '-')}: ${this.stringify(this.value, level + 1)}`;
  }
}
export class AddedNode extends Node {
  constructor(key, value) {
    super(key);
    this.value = value;
  }
  toString(level) {
    return `${this.getNewKey(level, '+')}: ${this.stringify(this.value, level + 1)}`;
  }
}
