import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';
import build from './builder';


const parseFile = filePath => parse(path.extname(filePath))(fs.readFileSync(filePath, 'utf8'));

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

const nodeToString = {
  unchanged: ({ key, before }, level) => `${getPadding(level)}    ${key}: ${stringify(before, level + 1)}`,
  updated: ({ key, before, after }, level) => [
    `${getPadding(level)}  + ${key}: ${stringify(after, level + 1)}`,
    `${getPadding(level)}  - ${key}: ${stringify(before, level + 1)}`,
  ],
  deleted: ({ key, before }, level) => `${getPadding(level)}  - ${key}: ${stringify(before, level + 1)}`,
  inserted: ({ key, after }, level) => `${getPadding(level)}  + ${key}: ${stringify(after, level + 1)}`,
  // children: ({ diff }, render) => render(diff),
  children: ({ key, children }, level, render) => {
    // console.log('diff in children ', children);
    return `${getPadding(level)}    ${key}: ${render(children, level + 1)}`;
  },
};

const render = (data, level = 0) => {
  // console.log(data);
  // const stringResult = _.flatten(data.map(d => nodeToString[d.type](d.diff, render)));
  const stringResult = _.flatten(data.map((d) => {
    // console.log(d);
    return nodeToString[d.type](d, level, render);
  }));
  return ['{', ...stringResult, `${getPadding(level)}}`].join('\n');
};

export default (beforePath, afterPath) => {
  const before = parseFile(beforePath);
  const after = parseFile(afterPath);
  const result = build(before, after);
  return `${render(result)}\n`;
};
