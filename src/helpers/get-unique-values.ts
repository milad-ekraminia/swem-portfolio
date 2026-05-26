export const getUniqueValues = (data: any[], key: string) => {
  return [...new Set(data?.map((item) => item[key]) || [])] as string[];
};
