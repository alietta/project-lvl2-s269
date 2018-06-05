import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

test('difference json', () => {
  const beforePath = getFixturePath('before.json');
  const afterPath = getFixturePath('after.json');
  const diffPath = getFixturePath('diff.txt');
  const expected = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(beforePath, afterPath)).toBe(expected);
});

test('difference yaml', () => {
  const beforePath = getFixturePath('before.yaml');
  const afterPath = getFixturePath('after.yaml');
  const diffPath = getFixturePath('diffYaml.txt');
  const expected = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(beforePath, afterPath)).toBe(expected);
});

test('difference ini', () => {
  const beforePath = getFixturePath('before.ini');
  const afterPath = getFixturePath('after.ini');
  const diffPath = getFixturePath('diffIni.txt');
  const expected = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(beforePath, afterPath)).toBe(expected);
});
