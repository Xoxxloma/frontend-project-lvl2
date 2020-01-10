import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const types = ['json', 'yaml', 'ini'];
const formats = ['tree', 'plain', 'json'];
const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);

const argues = formats.flatMap((format) => (
  types.map((type) => [type, format])
));

test.each(argues)('%s', (type, format) => {
  const before = getPath(`before.${type}`);
  const after = getPath(`after.${type}`);
  const actual = gendiff(before, after, format);
  const expected = fs.readFileSync(getPath(format), 'utf-8');
  expect(actual).toEqual(expected);
});
