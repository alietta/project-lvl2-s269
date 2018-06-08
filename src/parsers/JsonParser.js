export default class JsonParser {
  constructor() {
    this.type = '.json';
  }
  parse = text => JSON.parse(text);
}
