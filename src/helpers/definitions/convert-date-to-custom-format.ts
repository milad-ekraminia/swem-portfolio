export const convertDateToCustomFormat = () => {
  const currentDate = new Date();

  // Convert to the desired timezone offset (+03:00)
  const timezoneOffset = 3 * 60; // +03:00 in minutes
  const localDate = new Date(
    currentDate.getTime() + timezoneOffset * 60 * 1000,
  );

  // Format the date to the desired string
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(localDate.getUTCDate()).padStart(2, '0');
  const hours = String(localDate.getUTCHours()).padStart(2, '0');
  const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(localDate.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+03:00`;
};
