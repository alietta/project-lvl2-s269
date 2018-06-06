import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';
import build from './builder';

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
  const result = build(before, after);

  const stringResult = _.flatten(result.map(r => nodeToString[r.type](r.diff)));
  return ['{', ...stringResult, '}\n'].join('\n');
};
