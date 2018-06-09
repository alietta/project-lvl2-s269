import PlainRender from './plain/PlainRender';
import TreeRender from './tree/TreeRender';
import JsonRender from './JsonRender';

const renders = {
  plain: PlainRender,
  tree: TreeRender,
  json: JsonRender,
};

export default (format, data) => {
  const Render = renders[format];
  if (!Render) {
    throw new Error(`unkown format: ${format}`);
  }
  return new Render(data);
};
