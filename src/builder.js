import _ from 'lodash';

const buildAST = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));

  return keys.map((key) => {
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (before[key] === after[key]) {
          return { type: 'unchanged', diff: { key, before: before[key] } };
        }
        return {
          type: 'updated', diff: { key, after: after[key], before: before[key] },
        };
      }
      return { type: 'deleted', diff: { key, before: before[key] } };
    }
    return { type: 'inserted', diff: { key, after: after[key] } };
  }, []);
};

export default buildAST;
