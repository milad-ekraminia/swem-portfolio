import { getCookie } from './cookies';

export function formatNumberWithCommas(number: any, decimalPlaces: number) {
  const currentLanguage =
    getCookie('CultureName') ?? (import.meta.env.VITE_CULTURE_NAME as string);

  const locale =
    currentLanguage === 'tr' || currentLanguage === 'tr-TR'
      ? 'tr-TR'
      : currentLanguage === 'fa' || currentLanguage === 'fa-IR'
        ? 'fa-IR'
        : 'en-US';

  const decimalDigits =
    typeof decimalPlaces === 'number' &&
    Number.isFinite(decimalPlaces) &&
    decimalPlaces >= 0
      ? decimalPlaces
      : 0;

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  });

  if (number === null || number === undefined) {
    return formatter.format(0);
  }

  let numValue: number;

  if (typeof number === 'string') {
    const trimmedString = number.trim();

    if (!trimmedString) {
      return formatter.format(0);
    }

    // Check if string contains formatting characters (commas or multiple dots)
    const hasComma = trimmedString.includes(',');
    const dotCount = (trimmedString.match(/\./g) || []).length;
    const commaCount = (trimmedString.match(/,/g) || []).length;

    // If string has formatting, clean it first
    if (hasComma || dotCount > 1 || (dotCount === 1 && commaCount > 0)) {
      let cleanedString = trimmedString;

      // Check if it's Turkish format (comma as decimal separator)
      // Turkish: "3.975,8305" - comma comes after the last dot
      if (
        hasComma &&
        trimmedString.lastIndexOf(',') > trimmedString.lastIndexOf('.')
      ) {
        // Turkish format: remove all dots (thousand separators), replace comma with dot
        cleanedString = cleanedString.replace(/\./g, '').replace(',', '.');
      } else if (hasComma && dotCount > 0) {
        // Has both comma and dot - English format: "3,975.8305"
        // Remove commas (thousand separators), keep dot
        cleanedString = cleanedString.replace(/,/g, '');
      } else if (hasComma && dotCount === 0) {
        // Only comma, could be Turkish format without thousand separator: "3975,8305"
        cleanedString = cleanedString.replace(',', '.');
      } else if (dotCount > 1) {
        // Multiple dots - likely Turkish format: "3.975.830" (though unusual)
        // Remove all dots except the last one, or treat as thousand separators
        cleanedString = cleanedString.replace(/\./g, '');
      }

      numValue = Number.parseFloat(cleanedString);
    } else {
      // Simple string number, parse directly
      numValue = Number.parseFloat(trimmedString);
    }
  } else {
    numValue = Number(number);
  }

  if (Number.isNaN(numValue)) {
    return formatter.format(0);
  }

  // const formattedValue = formatter
  //   .format(numValue)
  //   .replace(/\./g, '__DOT__') // temporarily replace dots
  //   .replace(/,/g, '.') // replace commas with dots
  //   .replace(/__DOT__/g, ',');

  // if (locale === 'fa-IR') {
  //   return convertToPersianDigits(formattedValue);
  // }

  // return formattedValue;

  const formattedValue = formatter.format(numValue);

  if (locale === 'fa-IR') {
    return convertToPersianDigits(formattedValue);
  }

  return formattedValue;
}

const convertToPersianDigits = (value: string) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.replace(/\d/g, (digit) => persianDigits[Number(digit)]);
};
