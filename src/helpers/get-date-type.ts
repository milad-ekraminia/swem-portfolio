export const getDateTypeWithAllOptions = (periodType: string) => {
  const value = parseInt(periodType);
  switch (value) {
    case 1:
      return 'DD/MM/YYYY HH:mm';
    case 2:
      return 'DD/MM/YYYY';
    case 3:
      return 'MMMM YYYY';
    default:
      return 'DD/MM/YYYY HH:mm';
  }
};

export const formatDateForPeriodTypeWithAllOptions = (
  value: string,
  periodType: string,
): string => {
  if (!value) return ''; // Handle empty value

  const date = new Date(value); // Parse the input date string
  const pad = (num: number) => String(num).padStart(2, '0');

  switch (periodType) {
    case '1': // datetime-local
      return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    case '2': // date
      return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`;
    case '3': // month
      return `${date.getFullYear()}-${pad(date.getMonth())}`;
    default:
      return value; // If the periodType is invalid, return the original value
  }
};

export const formatDateForPeriodTypeWithoutAllOptions = (
  value: string,
  periodType: string,
): string => {
  if (!value) return ''; // Handle empty value

  const date = new Date(value); // Parse the input date string
  const pad = (num: number) => String(num).padStart(2, '0');

  switch (periodType) {
    case '0': // datetime-local
      return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    case '1': // date
      return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`;
    case '2': // month
      return `${date.getFullYear()}-${pad(date.getMonth())}`;
    default:
      return value; // If the periodType is invalid, return the original value
  }
};
