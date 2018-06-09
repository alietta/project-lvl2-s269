import ini from 'ini';

export default class IniParser {
  parse = text => ini.parse(text);
}
