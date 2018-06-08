import PlainRender from './PlainRender';
import TreeRender from './TreeRender';

const renders = {
  plain: PlainRender,
  tree: TreeRender,
};

export default (format, data) => {
  const Render = renders[format];
  if (!Render) {
    throw new Error(`unkown format: ${format}`);
  }
  return new Render(data);
};
