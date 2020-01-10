import { isObject, keys } from 'lodash';

export const makeSpaces = (times) => '  '.repeat(times);

export const stringify = (object, depth) => {
  if (!isObject(object)) {
    return object;
  }
  const openingSpaces = makeSpaces(depth + 2);
  const closingSpaces = makeSpaces(depth + 1);
  const allKeys = keys(object);
  return `{\n${allKeys
    .map((key) => `${openingSpaces}  ${key}: ${object[key]}`).join('\n')}\n${closingSpaces}}`;
};
