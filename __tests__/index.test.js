import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const formats = ['json', 'yaml', 'ini'];
const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);
const expected = fs.readFileSync(getPath('result'), 'utf-8');

test.each(formats)('%s', async (format) => {
  const before = getPath(`before.${format}`);
  const after = getPath(`after.${format}`);
  const actual = gendiff(before, after);
  expect(actual).toEqual(expected);
});
