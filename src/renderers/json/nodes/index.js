import JsonChildrenNode from './JsonChildrenNode';
import JsonUnchangedNode from './JsonUnchangedNode';
import JsonUpdatedNode from './JsonUpdatedNode';
import JsonDeletedNode from './JsonDeletedNode';
import JsonAddedNode from './JsonAddedNode';

const jsonNodes = {
  ChildrenNode: JsonChildrenNode,
  UnchangedNode: JsonUnchangedNode,
  UpdatedNode: JsonUpdatedNode,
  DeletedNode: JsonDeletedNode,
  AddedNode: JsonAddedNode,
};

export default (node) => {
  const type = node.constructor.name;
  const JsonNode = jsonNodes[type];
  if (!JsonNode) {
    throw new Error(`unkown format: ${type}`);
  }
  return new JsonNode(node);
};
