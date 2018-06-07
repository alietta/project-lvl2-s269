import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { Parser, FileParser } from './parser';
import build from './builder';


// const parseFile = filePath => parse(path.extname(filePath))(fs.readFileSync(filePath, 'utf8'));

const getPadding = level => ' '.repeat(level * 4);

const stringify = (body, level) => {
  if (body instanceof Object) {
    return JSON.stringify(body, null, '\t')
      .replace(/\t+/g, getPadding(level + 1))
      .replace(/"/g, '')
      .replace(/\}/g, `${getPadding(level)}}`);
  }
  return body;
};

const getNewKey = (key, level, mode = ' ') => `${getPadding(level)}  ${mode} ${key}`;
const nodeToString = {
  unchanged: ({ key, before }, level) => `${getNewKey(key, level)}: ${stringify(before, level + 1)}`,
  updated: ({ key, before, after }, level) => [
    `${getNewKey(key, level, '+')}: ${stringify(after, level + 1)}`,
    `${getNewKey(key, level, '-')}: ${stringify(before, level + 1)}`,
  ],
  deleted: ({ key, before }, level) => `${getNewKey(key, level, '-')}: ${stringify(before, level + 1)}`,
  inserted: ({ key, after }, level) => `${getNewKey(key, level, '+')}: ${stringify(after, level + 1)}`,
  children: ({ key, children }, level, render) => `${getNewKey(key, level)}: ${render(children, level + 1)}`,
};

const render = (data, level = 0) => {
  const stringResult = _.flatten(data.map(d => nodeToString[d.type](d, level, render)));
  return ['{', ...stringResult, `${getPadding(level)}}`].join('\n');
};

export default (beforePath, afterPath) => {
  const parser = new Parser(path.extname(beforePath));
  const fileParser = new FileParser(parser.getParser());
  const before = fileParser.parse(beforePath);
  const after = fileParser.parse(afterPath);
  const result = build(before, after);
  return `${render(result)}\n`;
};
