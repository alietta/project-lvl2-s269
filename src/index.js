import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parseFunction';

const nodeToString = {
  unchanged: ({ key, before }) => `\n   ${key}: ${before}`,
  updated: ({ key, before, after }) => `\n + ${key}: ${after}\n - ${key}: ${before}`,
  deleted: ({ key, before }) => `\n - ${key}: ${before}`,
  inserted: ({ key, after }) => `\n + ${key}: ${after}`,
};
const parseFile = filePath => parse(path.extname(filePath))(fs.readFileSync(filePath, 'utf8'));

export default (beforePath, afterPath) => {
  const before = parseFile(beforePath);
  const after = parseFile(afterPath);
  const keysBefore = _.keys(before);
  const keysAfter = _.keys(after);
  const keys = keysBefore.concat(_.difference(keysAfter, keysBefore));
  const result = keys.reduce((acc, key) => {
    if (_.has(before, key)) {
      if (_.has(after, key)) {
        if (before[key] === after[key]) {
          return [...acc, { type: 'unchanged', diff: { key, before: before[key] } }];
        }
        return [...acc,
          {
            type: 'updated', diff: { key, after: after[key], before: before[key] },
          }];
      }
      return [...acc, { type: 'deleted', diff: { key, before: before[key] } }];
    }
    return [...acc, { type: 'inserted', diff: { key, after: after[key] } }];
  }, []);
  const stringResult = result.reduce((acc, r) => `${acc}${nodeToString[r.type](r.diff)}`, '');
  return `{${stringResult}\n}\n`;
};
