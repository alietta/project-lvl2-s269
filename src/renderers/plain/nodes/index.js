import PlainChildrenNode from './PlainChildrenNode';
import PlainUnchangedNode from './PlainUnchangedNode';
import PlainUpdatedNode from './PlainUpdatedNode';
import PlainDeletedNode from './PlainDeletedNode';
import PlainAddedNode from './PlainAddedNode';

const PlainNodes = {
  ChildrenNode: PlainChildrenNode,
  UnchangedNode: PlainUnchangedNode,
  UpdatedNode: PlainUpdatedNode,
  DeletedNode: PlainDeletedNode,
  AddedNode: PlainAddedNode,
};

export default (node) => {
  const type = node.constructor.name;
  const PlainNode = PlainNodes[type];
  if (!PlainNode) {
    throw new Error(`unkown format: ${type}`);
  }
  return new PlainNode(node);
};
