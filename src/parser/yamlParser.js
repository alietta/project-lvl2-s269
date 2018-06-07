import { safeLoad } from 'js-yaml';

export default class YAMLParser {
  constructor() {
    this.type = '.yaml';
    this.parse = safeLoad;
  }
}
