import fs from 'fs';
import path from 'path';
import gendiff from '../src';

test('shows the differences', () => {
  const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);
  const before = getPath('before.json');
  const after = getPath('after.json');
  const result = fs.readFileSync(getPath('result'), 'utf-8');
  expect(gendiff(before, after)).toEqual(result);
});
