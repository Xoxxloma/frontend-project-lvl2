import { isObject, keys, flattenDeep } from 'lodash';

const makeSpaces = (times) => '  '.repeat(times);

const stringify = (object, depth) => {
  if (!isObject(object)) {
    return object;
  }
  const openingSpaces = makeSpaces(depth + 2);
  const closingSpaces = makeSpaces(depth + 1);
  const allKeys = keys(object);
  return `{\n${allKeys
    .map((key) => `${openingSpaces}  ${key}: ${object[key]}`).join('\n')}\n${closingSpaces}}`;
};

const render = (astTree) => {
  const iter = (data, depth = 1) => data.map((object) => {
    const space = makeSpaces(depth);
    const text = stringify(object.value, depth);
    switch (object.type) {
      case 'added':
        return `${space}+ ${object.key}: ${text}`;
      case 'deleted':
        return `${space}- ${object.key}: ${text}`;
      case 'changed':
        return `${space}- ${object.key}: ${stringify(object.beforeValue, depth)}\n${space}+ ${object.key}: ${stringify(object.afterValue, depth)}`;
      case 'unchanged':
        return `${space}  ${object.key}: ${text}`;
      case 'nested':
        return `${space}  ${object.key}: {\n${(iter(object.children, depth + 2))
          .join('\n')}\n${makeSpaces(depth + 1)}}`;
      default:
        throw new Error(`${object.type} is unknown`);
    }
  });
  return `{\n${(flattenDeep(iter(astTree))).join('\n')}\n}`;
};


export default render;
