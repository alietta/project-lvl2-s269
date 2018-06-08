import _ from 'lodash';
import ChildrenNode from './nodes/ChildrenNode';
import UnchangedNode from './nodes/UnchangedNode';
// import UpdatedNode from './nodes/UpdatedNode';
import DeletedNode from './nodes/DeletedNode';
import AddedNode from './nodes/AddedNode';

class ASTBulder {
  constructor(before, after) {
    this.before = before;
    this.after = after;
  }
  getKeys() {
    return _.union(_.keys(this.before), _.keys(this.after));
  }
  build() {
    const keys = this.getKeys();
    return keys.map((key) => {
      if (_.has(this.before, key)) {
        if (_.has(this.after, key)) {
          if (this.after[key] instanceof Object && this.before[key] instanceof Object) {
            const newASTBuilder = new ASTBulder(this.before[key], this.after[key]);
            return new ChildrenNode(key, newASTBuilder.build());
          } else if (this.before[key] === this.after[key]) {
            return new UnchangedNode(key, this.before[key]);
          }
          // return new UpdatedNode(key, this.before[key], this.after[key]);
          return [new AddedNode(key, this.after[key]), new DeletedNode(key, this.before[key])];
        }
        return new DeletedNode(key, this.before[key]);
      }
      return new AddedNode(key, this.after[key]);
    }, []);
  }
}
export default ASTBulder;
