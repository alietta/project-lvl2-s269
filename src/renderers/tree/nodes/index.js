import TreeChildrenNode from './TreeChildrenNode';
import TreeUnchangedNode from './TreeUnchangedNode';
import TreeUpdatedNode from './TreeUpdatedNode';
import TreeDeletedNode from './TreeDeletedNode';
import TreeAddedNode from './TreeAddedNode';

const treeNodes = {
  ChildrenNode: TreeChildrenNode,
  UnchangedNode: TreeUnchangedNode,
  UpdatedNode: TreeUpdatedNode,
  DeletedNode: TreeDeletedNode,
  AddedNode: TreeAddedNode,
};

export default (node) => {
  const type = node.constructor.name;
  const TreeNode = treeNodes[type];
  if (!TreeNode) {
    throw new Error(`unkown format: ${type}`);
  }
  return new TreeNode(node);
};
