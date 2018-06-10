export default class JsonRender {
  getType = (node) => {
    if (typeof node === 'undefined') {
      return 'undefined';
    } else if (node === null) {
      return 'null';
    }
    const className = node.constructor.name;
    return className.substring(0, className.length - 4).toLowerCase();
  }
  makeNodeObject(node) {
    let diff;
    if (!node.children) {
      diff = { ...node };
      delete (diff.key);
    } else {
      diff = { children: node.children.map(child => this.makeNodeObject(child)) };
    }
    return { [`${node.key}`]: diff };
  }
  render = (data) => {
    const result = data.reduce((acc, d) => ({ ...acc, ...this.makeNodeObject(d) }), {});
    return JSON.stringify(result, null, ' ');
  };
}
