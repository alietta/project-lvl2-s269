import fs from 'fs';
import JSONParser from './jsonParser';
import YAMLParser from './yamlParser';
import INIParser from './iniParser';

export default class Parser {
  constructor(type) {
    this.type = type;
    this.parser = this.getParser();
  }
  getParser() {
    if (this.type === '.json') {
      return new JSONParser();
    } else if (this.type === '.yaml') {
      return new YAMLParser();
    } else if (this.type === '.ini') {
      return new INIParser();
    }
    throw new Error(`unkown format: ${this.type}`);
  }
  parseFile(filePath) {
    return this.parser.parse(fs.readFileSync(filePath, 'utf8'));
  }
}
