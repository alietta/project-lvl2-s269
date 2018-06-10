import getJsonNode from './nodes';

export default class JsonRender {
  render = (data) => {
    const result = data.reduce((acc, d) => ({ ...acc, ...getJsonNode(d).makeNodeObject() }), {});
    return JSON.stringify(result, null, ' ');
  };
}
