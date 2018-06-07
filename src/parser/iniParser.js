import ini from 'ini';

export default class INIParser {
  constructor() {
    this.type = '.yaml';
    this.parse = ini.parse;
  }
}
