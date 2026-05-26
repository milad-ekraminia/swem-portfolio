export const calculateSomething = (periodType: string) => {
  if (periodType === 'Daily') {
    return 1;
  } else if (periodType === 'Monthly') {
    return 2;
  } else if (periodType === 'Yearly') {
    return 3;
  }
};
