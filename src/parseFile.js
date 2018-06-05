import fs from 'fs';
import path from 'path';
import ini from 'ini';
import { safeLoad } from 'js-yaml';

const parseByType = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};
export default (filePath) => {
  const type = path.extname(filePath);
  return parseByType[type](fs.readFileSync(filePath, 'utf8'));
};
