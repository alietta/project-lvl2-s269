import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRender from './renders';
import DiffBulder from './builder';

export default (beforePath, afterPath, format = 'tree') => {
  const type = path.extname(beforePath);
  const parser = getParser(type);
  const before = parser.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = parser.parse(fs.readFileSync(afterPath, 'utf8'));
  const builder = new DiffBulder(before, after);
  const result = builder.buildAST();
  const resultRender = getRender(format);
  return `${resultRender.render(result)}\n`;
};
