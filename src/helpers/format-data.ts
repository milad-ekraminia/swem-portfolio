import { getCookie } from './cookies';

export const formatDate = (providedDate: string, periodType?: number) => {
  if (providedDate) {
    const date = new Date(providedDate);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (periodType == 1) {
      return `${year}-${month}-${day} ${hours}:${
        minutes < 10 ? '0' : ''
      }${minutes}`;
    } else if (periodType == 2) {
      return `${year}-${month}-${day}`;
    } else if (periodType == 3) {
      return `${year}-${month}`;
    } else if (periodType == 4) {
      return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    } else {
      return `${year}-${month}-${day} ${hours}:${
        minutes < 10 ? '0' : ''
      }${minutes}`;
    }
  } else {
    return '-';
  }
};

export const dateFormatter = (
  date: string,
  haveTime?: boolean,
  justText?: boolean,
  hasSecond?: boolean,
  format?: string,
) => {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

  const locale =
    currentLanguage === 'tr'
      ? 'tr-TR'
      : currentLanguage === 'fa'
        ? 'fa-IR'
        : 'en-US';

  if (!date) return '';

  // Helper function to format date for Turkish locale with comma
  const formatTurkishDate = (
    dateObj: Date,
    includeTime: boolean,
    includeSecond: boolean,
  ) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const datePart = `${day}.${month}.${year}`;

    if (includeTime) {
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      if (includeSecond) {
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        const result = `${datePart}, ${hours}:${minutes}:${seconds}`;
        console.log('formatTurkishDate with seconds:', result);
        return result;
      }
      const result = `${datePart}, ${hours}:${minutes}`;
      console.log('formatTurkishDate without seconds:', result);
      return result;
    }
    console.log('formatTurkishDate date only:', datePart);
    return datePart;
  };

  // If format is provided, use it to determine which parts to show with locale
  if (format && typeof format === 'string' && format.trim() !== '') {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    // For Turkish locale, use custom formatting with comma
    if (locale === 'tr-TR' && haveTime) {
      return formatTurkishDate(dateObj, true, hasSecond || false);
    }

    // Use Intl.DateTimeFormat with locale for proper formatting
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('YYYY')) {
      options.year = 'numeric';
    }
    if (format.includes('MM')) {
      options.month = '2-digit';
    }
    if (format.includes('DD')) {
      options.day = '2-digit';
    }

    // If we have time parameters, add them
    if (haveTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      if (hasSecond) {
        options.second = '2-digit';
      }
    }

    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  }

  // If format is empty or undefined, use default YYYY-MM-DD format with locale
  if (format === '' || format === undefined) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    // For Turkish locale, use custom formatting with comma
    if (locale === 'tr-TR' && haveTime) {
      return formatTurkishDate(dateObj, true, hasSecond || false);
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    if (haveTime) {
      defaultOptions.hour = '2-digit';
      defaultOptions.minute = '2-digit';
      defaultOptions.hour12 = false;
      if (hasSecond) {
        defaultOptions.second = '2-digit';
      }
    }

    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  }

  // Custom format: "YYYY-MM-DD HH" or "YYYY-MM-DD HH:mm" or "YYYY-MM-DD HH:mm:ss"
  const customDateMatch = date.match(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::(\d{2}))?(?::(\d{2}))?$/,
  );
  if (customDateMatch) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_fullMatch, year, month, day, hour, minute, second] =
      customDateMatch;
    let timePart = '';

    if (haveTime) {
      if (hasSecond) {
        timePart = hasSecond
          ? `, ${hour}:${minute ?? '00'}:${second ?? '00'}`
          : `, ${hour}:${minute ?? '00'}`;
      } else {
        timePart = `, ${hour}:${minute ?? '00'}`;
      }
    }

    if (locale === 'tr-TR') {
      return `${day}.${month}.${year}${timePart}`;
    } else {
      return `${month}/${day}/${year}${timePart ? ' ' + timePart.substring(2) : ''}`;
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  if (haveTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.hour12 = false;
    if (hasSecond) {
      options.second = '2-digit';
    }
  }

  if (justText && !haveTime) {
    // Return only day + month as text
    const parts = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'long',
    }).formatToParts(new Date(date));

    const day = parts.find((p) => p.type === 'day')?.value;
    const month = parts.find((p) => p.type === 'month')?.value;

    return `${day} ${month}`;
  }

  // For Turkish locale with time, use custom formatting with comma
  if (locale === 'tr-TR' && haveTime) {
    return formatTurkishDate(new Date(date), true, hasSecond || false);
  }

  if (haveTime) {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  } else {
    // For Turkish locale without time, use custom formatting
    if (locale === 'tr-TR') {
      return formatTurkishDate(new Date(date), false, false);
    }
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date));
  }
};

export const daysOfMonthDateFormatter = (date: string) => {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const locale =
    currentLanguage === 'tr'
      ? 'tr-TR'
      : currentLanguage === 'fa'
        ? 'fa-IR'
        : 'en-US';
  if (!date) return '';

  return new Intl.DateTimeFormat(locale, {
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};

export const monthDateFormatter = (date: string) => {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const locale =
    currentLanguage === 'tr'
      ? 'tr-TR'
      : currentLanguage === 'fa'
        ? 'fa-IR'
        : 'en-US';

  if (!date) return '';

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
  }).format(parsedDate);
};

export const formatTime = (time: number) => {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const hours = Math.round(time / 60);
  const minutes = time % 60;
  if (hours > 0) {
    if (minutes > 0) {
      return currentLanguage === 'fa'
        ? `${hours} ساعت ${minutes} دقیقه`
        : currentLanguage === 'en'
          ? `${hours} h ${minutes} m`
          : `${hours} s ${minutes} dk`;
    }
    return currentLanguage === 'fa'
      ? `${hours} ساعت`
      : currentLanguage === 'en'
        ? `${hours} h`
        : `${hours} s`;
  }
  return currentLanguage === 'fa'
    ? `${minutes} دقیقه`
    : currentLanguage === 'en'
      ? `${minutes} m`
      : `${minutes} dk`;
};
export const formatDateTime = (providedDate: string) => {
  const date = new Date(providedDate);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatMonthlyDate = (providedDate: string) => {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);
  const locale =
    currentLanguage === 'tr'
      ? 'tr-TR'
      : currentLanguage === 'fa'
        ? 'fa-IR'
        : 'en-US';
  const date = new Date(providedDate);

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
  }).format(new Date(date));
};

function jalaliMonthDays(year: number, month: number) {
  if (month <= 6) return 31;
  if (month <= 11) return 30;

  // Esfand rules
  const isLeap = ((((year - 474) % 2820) + 474 + 38) * 682) % 2816 < 682;
  return isLeap ? 30 : 29;
}

export function jalaliMonthRange(year: number, month: number) {
  const start = jalaliToGregorian(year, month, 1);

  const days = jalaliMonthDays(year, month);
  const end = jalaliToGregorian(year, month, days);

  return {
    start: `${start.gy}-${start.gm}-${start.gd}`,
    end: `${end.gy}-${end.gm}-${end.gd}`,
  };
}

export function jalaliToGregorian(jy: number, jm: number, jd: number) {
  jy -= 979;
  jm -= 1;
  jd -= 1;

  const jDay =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    jd +
    (jm < 6 ? jm * 31 : (jm - 6) * 30 + 186);

  let gDay = jDay + 79;

  let gy = 1600 + 400 * Math.floor(gDay / 146097);
  gDay %= 146097;

  let leap = true;
  if (gDay >= 36525) {
    gDay--;
    gy += 100 * Math.floor(gDay / 36524);
    gDay %= 36524;
    leap = gDay >= 365 ? false : leap;
    if (!leap) gDay++;
  }

  gy += 4 * Math.floor(gDay / 1461);
  gDay %= 1461;

  if (gDay >= 366) {
    leap = false;
    gDay--;
    gy += Math.floor(gDay / 365);
    gDay %= 365;
  }

  const days = [0, 31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let gm = 0;
  for (gm = 0; gm < 13; gm++) {
    if (gDay < days[gm]) break;
    gDay -= days[gm];
  }

  return { gy, gm, gd: gDay + 1 };
}

// function jalaliLeap(year: number) {
//   return ((((year - 474) % 2820) + 474 + 38) * 682) % 2816 < 682;
// }

// function esfandDays(year: number) {
//   return jalaliLeap(year) ? 30 : 29;
// }

export function jalaliYearRange(year: number) {
  const start = jalaliToGregorian(year, 1, 1);
  // const end = jalaliToGregorian(year, 12, esfandDays(year));

  return `${start.gy}-${start.gm}-${start.gd}`;
}
