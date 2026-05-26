import { englishLocalization } from '@/helpers/english-localization';

// it should get application-localization key from localStorage and pars from string to object and find  key from object and return value of key
export const getTranslatedValue = (
  value: string,
  dirName?: string,
  resources?: any,
) => {
  let translatedLanguage = resources;

  if (!translatedLanguage) {
    const stored = localStorage.getItem('application-localization');
    translatedLanguage =
      stored && stored !== 'undefined' ? JSON.parse(stored) : {};
  }

  const getValue = (lang: any) => {
    if (!lang) return undefined;
    if (dirName) {
      const pathParts = dirName.split('.');
      return pathParts.reduce((acc, part) => acc?.[part], lang)?.[value];
    }
    return lang?.WebNet?.texts?.[value];
  };

  let translatedValue = getValue(translatedLanguage);
  if (!translatedValue || translatedValue?.length === 0) {
    translatedValue = getValue(englishLocalization);
  }

  return translatedValue?.length > 0 ? translatedValue : value;
};
