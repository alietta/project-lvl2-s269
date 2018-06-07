import _ from 'lodash';
import path from 'path';
import Parser from './parser/parser';
import ASTBulder from './builder';

const render = (data, level = 0) => {
  const stringResult = _.flatten(data.map(d => d.toString(level, render)));
  return ['{', ...stringResult, `${data[0].getPadding(level)}}`].join('\n');
};

export default (beforePath, afterPath) => {
  const parser = new Parser(path.extname(beforePath));
  const before = parser.parseFile(beforePath);
  const after = parser.parseFile(afterPath);
  const builder = new ASTBulder(before, after);
  const result = builder.build();
  return `${render(result)}\n`;
};
