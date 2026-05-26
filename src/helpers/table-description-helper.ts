import { dateFormatter } from './format-data';
import { getTranslatedValue } from './get-translated-value';

export const tableDescriptionHelper = ({
  timetoReadtheLatestData,
  theTimeoftheLastConfirmedData,
}: {
  timetoReadtheLatestData: string;
  theTimeoftheLastConfirmedData: string;
}) => {
  return timetoReadtheLatestData && theTimeoftheLastConfirmedData
    ? getTranslatedValue(`TheTimeoftheLastConfirmedData`) +
        ' ' +
        dateFormatter(theTimeoftheLastConfirmedData, true) +
        ' - ' +
        getTranslatedValue(`TimetoReadtheLatestData`) +
        ' ' +
        dateFormatter(timetoReadtheLatestData, true)
    : timetoReadtheLatestData
      ? dateFormatter(timetoReadtheLatestData, true)
      : '';
};
