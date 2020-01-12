import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);

test.each([
  ['json', 'tree'], ['yaml', 'tree'], ['ini', 'tree'],
  ['json', 'plain'], ['yaml', 'plain'], ['ini', 'plain'],
  ['json', 'json'], ['yaml', 'json'], ['ini', 'json']])(
  '%s', (type, format) => {
    const before = getPath(`before.${type}`);
    const after = getPath(`after.${type}`);
    const actual = gendiff(before, after, format);
    const expected = fs.readFileSync(getPath(format), 'utf-8');
    expect(actual).toEqual(expected);
  },
);
