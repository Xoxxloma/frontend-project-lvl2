import fs from 'fs';
import path from 'path';
import parse from './parsers';
import astBuilder from './astBuilder';
import getFormatter from './formatters';

const gendiff = (pathToFile1, pathToFile2, format = 'tree') => {
  const data1 = fs.readFileSync(pathToFile1, 'utf-8');
  const data2 = fs.readFileSync(pathToFile2, 'utf-8');

  const type1 = path.extname(pathToFile1).slice(1);
  const type2 = path.extname(pathToFile2).slice(1);

  const obj1 = parse(data1, type1);
  const obj2 = parse(data2, type2);

  const getDifference = astBuilder(obj1, obj2);
  const render = getFormatter(format);
  return render(getDifference);
};

export default gendiff;
