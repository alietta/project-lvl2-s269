import _ from 'lodash';
import getTreeNode from './nodes';

export default class TreeRender {
  render(data, level = 0) {
    const stringResult = _.flatten(data.map((d) => {
      const treeNode = getTreeNode(d);
      return treeNode.toString(this, level);
    }));
    return ['{', ...stringResult, `${this.getPadding(level)}}`].join('\n');
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
