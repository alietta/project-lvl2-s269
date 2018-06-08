import JsonParser from './JsonParser';
import YamlParser from './YamlParser';
import IniParser from './IniParser';

const parsers = {
  '.ini': IniParser,
  '.yaml': YamlParser,
  '.json': JsonParser,
};

export default (format, options) => {
  const Parser = parsers[format];
  if (!Parser) {
    throw new Error(`unkown format: ${format}`);
  }
  return new Parser(options);
};
