import { dataParamsProps } from '@/types/api-methods';
import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;
const defaultDataParams: dataParamsProps = {
  'api-version': apiVersion,
  maxResultCount: 1000,
  skipCount: 0,
};

export async function fetchFirmWeatherDataLocationOWMSList({
  skipCount,
  maxResultCount,
  filterText,
}: {
  skipCount: number;
  maxResultCount: number;
  filterText: string;
}) {
  const dataParams: any = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };
  if (filterText) {
    dataParams.Filter = filterText;
  }

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS/countries-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchFirmWeatherDataLocationsList({
  skipCount,
  maxResultCount,
}: {
  skipCount: number;
  maxResultCount: number;
}) {
  const dataParams: dataParamsProps = {
    'api-version': apiVersion,
    maxResultCount,
    skipCount,
  };

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function fetchCountriesFirmNotContainsLookupList({
  Filter,
}: {
  Filter: string;
}) {
  const dataParams: any = { ...defaultDataParams };
  if (Filter) {
    dataParams.Filter = Filter;
  }

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS/countries-firm-not-contains-lookup`,
    type: 'get',
    dataParams: dataParams,
  });
}

export async function createNewWeatherDataLocation(formData: {
  weatherDataLocationId: number;
}) {
  return await getFormDataPost({
    endPoint: `app/firm-weather-data-location-oWMS?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function searchLocationNameList({ Filter }: { Filter: string }) {
  const dataParams: any = { ...defaultDataParams };
  if (Filter) {
    dataParams.Filter = Filter;
  }

  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS/filtered-countries`,
    type: 'get',
    dataParams: dataParams,
  });
}
