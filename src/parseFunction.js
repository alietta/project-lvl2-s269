
import ini from 'ini';
import { safeLoad } from 'js-yaml';

const parseByType = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};
export default type => parseByType[type];
