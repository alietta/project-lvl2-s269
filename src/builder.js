import _ from 'lodash';

const buildAST = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((key) => {
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (after[key] instanceof Object && before[key] instanceof Object) {
          return { type: 'children', key, children: buildAST(before[key], after[key]) };
        } else if (before[key] === after[key]) {
          return { type: 'unchanged', key, before: before[key] };
        }
        return {
          type: 'updated', key, after: after[key], before: before[key],
        };
      }
      return { type: 'deleted', key, before: before[key] };
    }
    return { type: 'inserted', key, after: after[key] };
  }, []);
};

export default buildAST;
