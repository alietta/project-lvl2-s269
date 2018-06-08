import ini from 'ini';

export default class IniParser {
  constructor() {
    this.type = '.yaml';
  }
  parse = text => ini.parse(text);
}
