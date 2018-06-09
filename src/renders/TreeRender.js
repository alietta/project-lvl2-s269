import _ from 'lodash';
import { DeletedNode, AddedNode } from '../nodes';

export default class TreeRender {
  constructor(data, level = 0) {
    this.type = 'tree';
    this.data = data;
    this.level = level;
  }
  render() {
    const stringResult = _.flatten(this.data.map((d) => {
      if (d.children instanceof Array) {
        const childrenRender = new TreeRender(d.children, this.level + 1);
        return `${this.getNewKey(d)}: ${childrenRender.render()}`;
      } else if (d instanceof Array) {
        return d.map(value => this.getString(value));
      }
      return this.getString(d);
    }));
    return ['{', ...stringResult, `${this.getPadding(this.level)}}`].join('\n');
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
  getNewKey = (data) => {
    let mode;
    if (data instanceof AddedNode) {
      mode = '+';
    } else if (data instanceof DeletedNode) {
      mode = '-';
    } else {
      mode = ' ';
    }
    return `${this.getPadding(this.level)}  ${mode} ${data.key}`;
  };
  getString = data => `${this.getNewKey(data)}: ${this.stringify(data.value, this.level + 1)}`
}
