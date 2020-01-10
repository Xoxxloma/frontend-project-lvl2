import plain from './plain';
import tree from './tree';
import json from './json';


const formatters = {
  tree,
  plain,
  json,
};

const getFormatter = (format) => formatters[format];

export default getFormatter;
