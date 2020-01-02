import fs from 'fs';
import path from 'path';
import parse from './parsers';
import astBuilder from './astBuilder';
import render from './stringify';

const gendiff = (pathToFile1, pathToFile2) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf-8');
  const data2 = fs.readFileSync(pathToFile2, 'utf-8');

  const type1 = path.extname(pathToFile1);
  const type2 = path.extname(pathToFile2);

  const obj1 = parse(data1, type1);
  const obj2 = parse(data2, type2);

  const difference = astBuilder(obj1, obj2);

  return render(difference);
};

export default gendiff;
