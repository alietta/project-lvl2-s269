import fs from 'fs';
import _ from 'lodash';

const nodeToString = {
  stable: ({ key, before }) => `\n   ${key}: ${before}`,
  update: ({ key, before, after }) => `\n + ${key}: ${after}\n - ${key}: ${before}`,
  delete: ({ key, before }) => `\n - ${key}: ${before}`,
  insert: ({ key, after }) => `\n + ${key}: ${after}`,
};

export default (beforePath, afterPath) => {
  const before = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = JSON.parse(fs.readFileSync(afterPath, 'utf8'));
  const keysBefore = _.keys(before);
  const keysAfter = _.keys(after);
  const keys = keysBefore.concat(_.difference(keysAfter, keysBefore));
  const result = keys.reduce((acc, key) => {
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (before[key] === after[key]) {
          return [...acc, { type: 'stable', diff: { key, before: before[key] } }];
        }
        return [...acc,
          {
            type: 'update', diff: { key, after: after[key], before: before[key] },
          }];
      }
      return [...acc, { type: 'delete', diff: { key, before: before[key] } }];
    }
    return [...acc, { type: 'insert', diff: { key, after: after[key] } }];
  }, []);
  const stringResult = result.reduce((acc, r) => `${acc}${nodeToString[r.type](r.diff)}`, '');
  return `{${stringResult}\n}\n`;
};
