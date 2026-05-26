export const constructGetParams = (dataParams: Record<string, any>): string => {
  // If the object is empty, return an empty string
  if (Object.keys(dataParams).length === 0) {
    return '';
  }

  // Convert the dataParams object into a URL query string
  return '?' + new URLSearchParams(dataParams).toString();
};
