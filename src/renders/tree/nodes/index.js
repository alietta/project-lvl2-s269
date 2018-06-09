import TreeChildrenNode from './TreeChildrenNode';
import TreeUnchangedNode from './TreeUnchangedNode';
import TreeUpdatedNode from './TreeUpdatedNode';
import TreeDeletedNode from './TreeDeletedNode';
import TreeAddedNode from './TreeAddedNode';

const treeNodes = {
  children: TreeChildrenNode,
  unchanged: TreeUnchangedNode,
  updated: TreeUpdatedNode,
  deleted: TreeDeletedNode,
  added: TreeAddedNode,
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
  const TreeNode = treeNodes[type];
  if (!TreeNode) {
    throw new Error(`unkown format: ${type}`);
  }
  return new TreeNode(node);
};
