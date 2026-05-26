export const getTodayDate = (separateFormat = '/') => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}${separateFormat}${month}${separateFormat}${day}`;
};
export const getTodayDateRaw = () => {
  const today = new Date();
  const day = today.getDate().toString();
  const dayNumber = today.getDate().toString().padStart(2, '0');
  const month = today.toLocaleString('default', { month: 'long' });
  const monthNumber = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();

  return {
    year,
    day,
    month,
    monthNumber,
    dayNumber,
  };
};
