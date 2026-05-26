export function buildArrayParams(key: string, values: (string | number)[]) {
  return values.reduce(
    (acc, value, index) => {
      acc[`${key}[${index}]`] = value;
      return acc;
    },
    {} as Record<string, string | number>,
  );
}
