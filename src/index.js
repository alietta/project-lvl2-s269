import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderers';
import DiffBulder from './builder';

export default (beforePath, afterPath, format = 'tree') => {
  const type = path.extname(beforePath);
  const parser = getParser(type);
  const before = parser.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = parser.parse(fs.readFileSync(afterPath, 'utf8'));
  const builder = new DiffBulder(before, after);
  const result = builder.buildAST();
  const resultRenderer = getRenderer(format);
  return resultRenderer.render(result);
};
