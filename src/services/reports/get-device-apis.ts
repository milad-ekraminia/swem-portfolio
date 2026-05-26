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

export async function getDeviceCategoryLookupApi(formData: any) {
  return await getFormDataPost({
    endPoint: `app/devices/get-device-category-lookup?api-version=${apiVersion}`,
    formData: {
      ...formData,
      skipCount: 0,
      maxResultCount: 1000,
      filter: '',
    },
    type: 'post',
  });
}

export async function getDeviceModelLookupApi(formData: any) {
  return await getFormDataPost({
    endPoint: `app/devices/get-device-model-lookup?api-version=${apiVersion}`,
    formData: {
      ...formData,
      skipCount: 0,
      maxResultCount: 1000,
      filter: '',
    },
    type: 'post',
  });
}

export async function getDeviceLabelLookupApi(formData: any) {
  return await getFormDataPost({
    endPoint: `app/devices/get-device-label-lookup?api-version=${apiVersion}`,
    formData: {
      ...formData,
      skipCount: 0,
      maxResultCount: 1000,
      filter: '',
    },
    type: 'post',
  });
}

export async function getCountriesLookupApi() {
  return await getData({
    endPoint: `app/firm-weather-data-location-oWMS/countries-lookup`,
    dataParams: defaultDataParams,
    type: 'get',
  });
}
