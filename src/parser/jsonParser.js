export default class JSONParser {
  constructor() {
    this.type = '.json';
    this.parse = JSON.parse;
  }
}
