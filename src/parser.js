import ini from 'ini';
import { safeLoad } from 'js-yaml';
import fs from 'fs';

class JSONParser {
  constructor() {
    this.type = '.json';
    this.parse = JSON.parse;
  }
}
class YAMLParser {
  constructor() {
    this.type = '.yaml';
    this.parse = safeLoad;
  }
}
class INIParser {
  constructor() {
    this.type = '.yaml';
    this.parse = ini.parse;
  }
}

export class Parser {
  constructor(type) {
    this.type = type;
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
}
export class FileParser {
  constructor(parser) {
    this.parser = parser;
  }
  parse(filePath) {
    return this.parser.parse(fs.readFileSync(filePath, 'utf8'));
  }
}
