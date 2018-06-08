import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRender from './renders';
import ASTBulder from './builder';

export default (beforePath, afterPath, format = 'tree') => {
  const type = path.extname(beforePath);
  const parser = getParser(type);
  const before = parser.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = parser.parse(fs.readFileSync(afterPath, 'utf8'));
  const builder = new ASTBulder(before, after);
  const result = builder.build();
  const resultRender = getRender(format, result);
  return `${resultRender.render()}\n`;
};
