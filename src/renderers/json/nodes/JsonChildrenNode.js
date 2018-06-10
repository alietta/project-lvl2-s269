import getJsonNode from './index';

export default class JsonChildrenNode {
  constructor(node) {
    this.node = node;
  }
  makeNodeObject() {
    const children = this.node.children.map(child => getJsonNode(child).makeNodeObject());
    return { [`${this.node.key}`]: { children } };
  }
}
