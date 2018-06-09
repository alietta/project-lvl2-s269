import { safeLoad } from 'js-yaml';

export default class YamlParser {
  parse = text => safeLoad(text);
}
