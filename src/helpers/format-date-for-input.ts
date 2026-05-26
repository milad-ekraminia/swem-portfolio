export const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  const localISODate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split('T')[0];
  return localISODate;
};
