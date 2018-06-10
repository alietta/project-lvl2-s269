import PlainRender from './plain/PlainRenderer';
import TreeRender from './tree/TreeRenderer';
import JsonRender from './JsonRenderer';

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
