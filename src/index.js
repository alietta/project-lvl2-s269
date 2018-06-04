import fs from 'fs';
import _ from 'lodash';

export default (beforePath, afterPath) => {
  const before = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
  const after = JSON.parse(fs.readFileSync(afterPath, 'utf8'));
  const keysBefore = _.keys(before);
  const keysAfter = _.keys(after);
  const keys = keysBefore.concat(_.difference(keysAfter, keysBefore));
  const result = keys.reduce((acc, key) => {
    let newAcc = {};
    if (!_.has(before, key)) {
      newAcc = { ...acc, [`+ ${key}`]: after[key] };
    } else if (!_.has(after, key)) {
      newAcc = { ...acc, [`- ${key}`]: before[key] };
    } else if (before[key] === after[key]) {
      newAcc = { ...acc, [`  ${key}`]: before[key] };
    } else {
      newAcc = {
        ...acc,
        [`+ ${key}`]: after[key],
        [`- ${key}`]: before[key],
      };
    }
    return newAcc;
  }, {});
  return `${JSON.stringify(result, null, ' ').replace(/"|,/g, '')}\n`;
};
