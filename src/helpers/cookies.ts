export const setCookie = (name: string, value: string, seconds?: number) => {
  let cookieString = `${name}=${value}; path=/;`;

  if (typeof seconds === 'number') {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000); // Convert seconds to milliseconds
    cookieString += ` expires=${date.toUTCString()};`;
  }

  document.cookie = cookieString;
};

// Get a cookie
export const getCookie = (name: string): string | undefined => {
  const nameEQ = `${name}=`;
  const cookiesArray = document.cookie.split(';');
  for (let cookie of cookiesArray) {
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return undefined;
};

// Delete a cookie
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
