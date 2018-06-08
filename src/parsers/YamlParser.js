import { safeLoad } from 'js-yaml';

export default class YamlParser {
  constructor() {
    this.type = '.yaml';
  }
  parse = text => safeLoad(text);
}
