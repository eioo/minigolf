function classNamesFromObject(obj: object) {
  return Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');
}

export function classNames(...input: Array<object | string>) {
  const strings = input.filter((c) => typeof c === 'string') as string[];
  const objects = input.filter((c) => typeof c === 'object') as object[];
  return [strings.join(' '), objects.map(classNamesFromObject)].join(' ');
}
