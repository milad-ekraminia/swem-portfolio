export const getClassNames = (
  baseClass: string,
  conditions: [boolean, string][],
) => {
  const conditionalClasses = conditions
    .filter(([condition]) => condition)
    .map(([, suffix]) => `${baseClass}-${suffix}`)
    .join(' ');
  return `${baseClass} ${conditionalClasses}`;
};
