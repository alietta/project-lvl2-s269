import _ from 'lodash';
import getTreeNode from './nodes';

export default class TreeRender {
  render = (data, level = 0) => {
    const stringResult = _.flatten(data.map((d) => {
      const treeNode = getTreeNode(d);
      return treeNode.toString(level, this.render);
    }));
    const firstNode = getTreeNode(data[0]);
    return ['{', ...stringResult, `${firstNode.getPadding(level)}}`].join('\n');
  }
}
