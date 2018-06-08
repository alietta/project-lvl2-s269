import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import ASTBulder from './builder';

const render = (data, level = 0) => {
  const stringResult = _.flatten(data.map(d => d.toString(level, render)));
  return ['{', ...stringResult, `${data[0].getPadding(level)}}`].join('\n');
};

export default (beforePath, afterPath) => {
  const format = path.extname(beforePath);
  const parser = getParser(format);
  const before = parser.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = parser.parse(fs.readFileSync(afterPath, 'utf8'));
  const builder = new ASTBulder(before, after);
  const result = builder.build();
  return `${render(result)}\n`;
};
