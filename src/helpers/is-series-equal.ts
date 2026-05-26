export const isSeriesEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].name !== b[i].name) return false;

    const dataA = a[i].data;
    const dataB = b[i].data;
    if (dataA.length !== dataB.length) return false;

    for (let j = 0; j < dataA.length; j++) {
      if (dataA[j] !== dataB[j]) return false;
    }
  }
  return true;
};
