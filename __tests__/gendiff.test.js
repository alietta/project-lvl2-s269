import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

test('difference', () => {
  const beforePath = getFixturePath('before.json');
  const afterPath = getFixturePath('after.json');
  const diffPath = getFixturePath('diff.txt');
  const expected = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(beforePath, afterPath)).toBe(expected);
});
