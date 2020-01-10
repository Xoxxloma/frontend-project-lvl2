const propertyValues = {
  string: (value) => `'${value}'`,
  number: (value) => value,
  object: () => '[complex value]',
  boolean: (value) => value,
};

const getValue = (value) => propertyValues[typeof value](value);

const render = (astTree) => {
  const iter = (data, path = '') => data.map((object) => {
    switch (object.type) {
      case 'added': {
        return `Property ${path}${object.key} was added with value ${getValue(object.value)}`;
      }
      case 'deleted': {
        return `Property ${path}${object.key} was removed`;
      }
      case 'changed': {
        return `Property ${path}${object.key} was updated. From ${getValue(object.beforeValue)} to ${getValue(object.afterValue)}`;
      }
      case 'unchanged': {
        return null;
      }
      case 'nested': {
        return `${iter(object.children, `${path}${object.key}.`).filter((node) => node !== null).join('\n')}`;
      }
      default:
        throw new Error(`${object.type} is unknown, but this is the way`);
    }
  });
  return iter(astTree).join('\n');
};

export default render;
