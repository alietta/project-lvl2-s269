import PlainChildrenNode from './PlainChildrenNode';
import PlainUnchangedNode from './PlainUnchangedNode';
import PlainUpdatedNode from './PlainUpdatedNode';
import PlainDeletedNode from './PlainDeletedNode';
import PlainAddedNode from './PlainAddedNode';

const PlainNodes = {
  children: PlainChildrenNode,
  unchanged: PlainUnchangedNode,
  updated: PlainUpdatedNode,
  deleted: PlainDeletedNode,
  added: PlainAddedNode,
};
const getType = (node) => {
  if (typeof node === 'undefined') {
    return 'undefined';
  } else if (node === null) {
    return 'null';
  }
  const className = node.constructor.name;
  return className.substring(0, className.length - 4).toLowerCase();
};
export default (node) => {
  const type = getType(node);
  const PlainNode = PlainNodes[type];
  if (!PlainNode) {
    throw new Error(`unkown format: ${type}`);
  }
  return new PlainNode(node);
};
