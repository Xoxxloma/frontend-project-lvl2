import {
  union, has, isObject, keys,
} from 'lodash';


const astBuilder = (object1, object2) => {
  const allKeys = union(keys(object1), keys(object2));

  const propertyActions = [
    {
      check: (key) => isObject(object1[key]) && isObject(object2[key]),
      form: (key) => ({
        type: 'nested',
        key,
        children: astBuilder(object1[key], object2[key]),
      }),
    },
    {
      check: (key) => !has(object1, key),
      form: (key) => ({
        type: 'added',
        key,
        value: object2[key],
      }),
    },
    {
      check: (key) => !has(object2, key),
      form: (key) => ({
        type: 'deleted',
        key,
        value: object1[key],
      }),
    },
    {
      check: (key) => object1[key] === object2[key],
      form: (key) => ({
        type: 'unchanged',
        key,
        value: object1[key],
      }),
    },
    {
      check: (key) => object1[key] !== object2[key],
      form: (key) => ({
        type: 'changed',
        key,
        beforeValue: object1[key],
        afterValue: object2[key],
      }),
    },
  ];

  const getAction = (key) => propertyActions.find(({ check }) => check(key));

  const result = allKeys.map((key) => {
    const currentAction = getAction(key);
    return currentAction.form(key);
  });
  return result;
};

export default astBuilder;
