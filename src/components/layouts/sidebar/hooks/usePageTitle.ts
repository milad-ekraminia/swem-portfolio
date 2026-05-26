import { useEffect } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { SIDEBAR_CONSTANTS } from '../constants';
import type { NavItem } from '../types';

export const usePageTitle = (
  found: NavItem | undefined,
  resources: any,
) => {
  useEffect(() => {
    if (found) {
      document.title = getTranslatedValue(found?.title, undefined, resources);
    } else {
      document.title = SIDEBAR_CONSTANTS.DEFAULT_APP_TITLE;
    }
  }, [found, resources]);
};

