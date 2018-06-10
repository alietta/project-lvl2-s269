export default class PlainUpdatedNode {
  constructor(updatedNode) {
    this.updatedNode = updatedNode;
  }
  toString(level) {
    return `Property '${level}${this.updatedNode.key}' was updated. From '${this.getTextValue(this.updatedNode.oldValue)}' to '${this.getTextValue(this.updatedNode.newValue)}'`;
  }
  getTextValue = (value) => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `${value}`;
  }
}
