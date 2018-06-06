import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';

const nodeToString = {
  unchanged: ({ key, before }) => `   ${key}: ${before}`,
  updated: ({ key, before, after }) => [` + ${key}: ${after}`, ` - ${key}: ${before}`],
  deleted: ({ key, before }) => ` - ${key}: ${before}`,
  inserted: ({ key, after }) => ` + ${key}: ${after}`,
};
const parseFile = filePath => parse(path.extname(filePath))(fs.readFileSync(filePath, 'utf8'));

export default (beforePath, afterPath) => {
  const before = parseFile(beforePath);
  const after = parseFile(afterPath);
  const keys = _.union(_.keys(before), _.keys(after));

  const result = keys.map((key) => {
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

  const stringResult = _.flatten(result.map(r => nodeToString[r.type](r.diff)));
  return ['{', ...stringResult, '}\n'].join('\n');
};
