import _ from 'lodash';

export default class PlainRender {
  constructor(data, level = '') {
    this.type = 'tree';
    this.data = data;
    this.level = level;
  }
  render() {
    const stringResult = _.flatten(this.data.map((d) => {
      if (d.children instanceof Array) {
        const childrenRender = new PlainRender(d.children, `${this.level}${d.key}.`);
        return `${childrenRender.render()}`;
      } else if (d instanceof Array) {
        return `Property '${this.level}${d[0].key}' was updated. From '${this.getTextValue(d[0].value)}' to '${this.getTextValue(d[1].value)}'`;
      }
      return d.getPlainText(`${this.level}${d.key}`, this.getTextValue);
    }));
    return `${stringResult.join('\n')}`;
  }
  getTextValue = (value) => {
    if (value instanceof Object) {
      return 'complex value';
    }
    return `${value}`;
  }
}
