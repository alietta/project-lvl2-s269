import _ from 'lodash';
import { ChildrenNode, DeletedNode, AddedNode } from '../nodes';

export default class PlainRender {
  constructor(data, level = '') {
    this.type = 'tree';
    this.data = data;
    this.level = level;
  }
  render() {
    const stringResult = _.flatten(this.data.map((d) => {
      if (d instanceof ChildrenNode) {
        const childrenRender = new PlainRender(d.children, `${this.level}${d.key}.`);
        return `${childrenRender.render()}`;
      } else if (d instanceof Array) {
        return `Property '${this.level}${d[0].key}' was updated. From '${this.getTextValue(d[0].value)}' to '${this.getTextValue(d[1].value)}'`;
      }
      return this.getPlainText(`${this.level}${d.key}`, d);
    }));
    return `${stringResult.join('\n')}`;
  }
  getTextValue = (value) => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `${value}`;
  }
  getPlainText(key, data) {
    if (data instanceof AddedNode) {
      return `Property '${key}' was added with ${this.getTextValue(data.value)}`;
    } else if (data instanceof DeletedNode) {
      return `Property '${key}' was removed`;
    }
    return `Property '${key}' was unchanged`;
  }
}
