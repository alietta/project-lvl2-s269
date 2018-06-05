import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';

const parseByType = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
};
export default (filePath) => {
  const type = path.extname(filePath);
  return parseByType[type](fs.readFileSync(filePath, 'utf8'));
};
