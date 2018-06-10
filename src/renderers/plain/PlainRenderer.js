import _ from 'lodash';
import getPlainNode from './nodes';

export default class PlainRender {
  render = (data, level = '') => {
    const stringResult = _.flatten(data.map((d) => {
      const plainNode = getPlainNode(d);
      return plainNode.toString(level, this.render);
    }));
    return `${stringResult.join('\n')}`;
  }
}
