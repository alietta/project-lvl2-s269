import _ from 'lodash';
import ChildrenNode from './nodes/сhildrenNode';
import UnchangedNode from './nodes/unchangedNode';
import UpdatedNode from './nodes/updatedNode';
import DeletedNode from './nodes/deletedNode';
import AddedNode from './nodes/addedNode';

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
          return new UpdatedNode(key, this.before[key], this.after[key]);
        }
        return new DeletedNode(key, this.before[key]);
      }
      return new AddedNode(key, this.after[key]);
    }, []);
  }
}
export default ASTBulder;
