import _ from 'lodash';
import { ChildrenNode, UnchangedNode, UpdatedNode, DeletedNode, AddedNode } from './nodes';

class DiffBulder {
  constructor(firstValue, secondValue) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
  }
  getKeys() {
    return _.union(_.keys(this.firstValue), _.keys(this.secondValue));
  }
  buildAST() {
    const keys = this.getKeys();
    return keys.map((key) => {
      if (_.has(this.firstValue, key)) {
        if (_.has(this.secondValue, key)) {
          if (this.secondValue[key] instanceof Object && this.firstValue[key] instanceof Object) {
            const newASTBuilder = new DiffBulder(this.firstValue[key], this.secondValue[key]);
            return new ChildrenNode(key, newASTBuilder.buildAST());
          } else if (this.firstValue[key] === this.secondValue[key]) {
            return new UnchangedNode(key, this.firstValue[key]);
          }
          return new UpdatedNode(key, this.firstValue[key], this.secondValue[key]);
        }
        return new DeletedNode(key, this.firstValue[key]);
      }
      return new AddedNode(key, this.secondValue[key]);
    }, []);
  }
}
export default DiffBulder;
