 
import { getCookie } from '@/helpers/cookies';
import axios, { AxiosResponse } from 'axios';
import { GetData } from '@/types/api-methods';
import { constructGetParams } from './construct-get-params';
import { constructHeaders } from './construct-headers';
import { handleResponse } from './response-handler';

// Environment configuration
const MAIN_URL = import.meta.env.VITE_API_MAIN_URL;
const AUTHENTICATION_URL = import.meta.env.VITE_API_AUTHENTICATION_URL;

// Authentication token
const AUTH_TOKEN = getCookie('auth_token');

// Types for better type safety
interface FormDataPostParams {
  endPoint: string;
  formData: any;
  default_token?: string;
  type: 'post' | 'put';
  isHeaderJson?: boolean;
  hasTenant?: boolean;
  hasExcel?: boolean;
}

/**
 * Utility function to determine if an endpoint requires authentication
 */
const requiresAuthentication = (endPoint: string): boolean => {
  const publicEndpoints = ['connect/token', 'register', 'forgot-password'];
  return !publicEndpoints.some((publicEndpoint) =>
    endPoint.includes(publicEndpoint),
  );
};

/**
 * Utility function to validate required parameters
 */
const validateApiParams = (endPoint: string, type: string): void => {
  if (!endPoint) {
    throw new Error('Endpoint is required');
  }
  if (!type) {
    throw new Error('Request type is required');
  }
  if (!['get', 'post', 'delete'].includes(type.toLowerCase())) {
    throw new Error(
      `Invalid request type: ${type}. Must be 'get', 'post', or 'delete'`,
    );
  }
};

/**
 * Determines the appropriate base URL based on the endpoint
 */
const getBaseUrl = (endPoint: string): string => {
  return endPoint?.includes('connect/token') ? AUTHENTICATION_URL : MAIN_URL;
};

/**
 * Prepares form data based on content type
 */
const prepareFormData = (dataParams: any, isHeaderJson: boolean): any => {
  return isHeaderJson ? dataParams : new URLSearchParams(dataParams);
};

/**
 * Handles API request errors consistently
 */
const handleApiError = (error: unknown): any => {
  if (error instanceof Error) {
    console.error('API Request Error:', error.message);
  }
  return handleResponse(error as AxiosResponse);
};

/**
 * Makes a POST request
 */
const makePostRequest = async (
  baseUrl: string,
  endPoint: string,
  dataParams: any,
  headers: any,
  isHeaderJson: boolean,
): Promise<any> => {
  const formData = prepareFormData(dataParams, isHeaderJson);
  const response: AxiosResponse<any> = await axios.post(
    `${baseUrl}${endPoint}`,
    formData,
    headers,
  );
  return handleResponse(response);
};

/**
 * Makes a DELETE request
 */
const makeDeleteRequest = async (
  baseUrl: string,
  endPoint: string,
  dataParams: any,
  headers: any,
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.delete(
      `${baseUrl}${endPoint}`,
      {
        ...headers,
        data: dataParams,
      },
    );
    return handleResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Makes a GET request
 */
const makeGetRequest = async (
  endPoint: string,
  dataParams: any,
  headers: any,
): Promise<any> => {
  try {
    const formData = constructGetParams(dataParams);
    const response: AxiosResponse<any> = await axios.get(
      `${MAIN_URL}${endPoint}${formData}`,
      headers,
    );
    return handleResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Main function to handle different types of API requests (GET, POST, DELETE)
 *
 * @param params - Configuration object for the API request
 * @returns Promise resolving to the API response
 */
export const getData = async ({
  endPoint,
  type,
  dataParams = {},
  isToken = true,
  isHeaderJson = false,
  default_token = null,
  hasTenant = false,
}: GetData): Promise<any> => {
  // Validate input parameters
  validateApiParams(endPoint, type);

  // Determine authentication requirements
  const needsAuth = requiresAuthentication(endPoint);
  const token = default_token ?? (isToken && needsAuth ? AUTH_TOKEN : null);

  const headers = constructHeaders(token, isHeaderJson, hasTenant);
  const baseUrl = getBaseUrl(endPoint);

  switch (type.toLowerCase()) {
    case 'post':
      return makePostRequest(
        baseUrl,
        endPoint,
        dataParams,
        headers,
        isHeaderJson,
      );

    case 'delete':
      return makeDeleteRequest(baseUrl, endPoint, dataParams, headers);

    case 'get':
    default:
      return makeGetRequest(endPoint, dataParams, headers);
  }
};

/**
 * Handles form data POST/PUT requests with file uploads
 *
 * @param params - Configuration object for the form data request
 * @returns Promise resolving to the API response
 */
export const getFormDataPost = async ({
  endPoint,
  formData,
  type = 'post',
  default_token = undefined,
  isHeaderJson = false,
  hasTenant = false,
  hasExcel = false,
}: FormDataPostParams): Promise<any> => {
  const url = MAIN_URL + endPoint;
  const token = default_token || AUTH_TOKEN;
  const headers = constructHeaders(token, isHeaderJson, hasTenant, hasExcel);

  try {
    const response: AxiosResponse<any> = await axios[type](
      url,
      formData,
      headers,
    );
    return handleResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Convenience function for GET requests
 */
export const apiGet = async (
  endPoint: string,
  dataParams: any = {},
  options: Partial<GetData> = {},
): Promise<any> => {
  return getData({
    endPoint,
    type: 'get',
    dataParams,
    ...options,
  });
};

/**
 * Convenience function for POST requests
 */
export const apiPost = async (
  endPoint: string,
  dataParams: any = {},
  options: Partial<GetData> = {},
): Promise<any> => {
  return getData({
    endPoint,
    type: 'post',
    dataParams,
    ...options,
  });
};

/**
 * Convenience function for DELETE requests
 */
export const apiDelete = async (
  endPoint: string,
  dataParams: any = {},
  options: Partial<GetData> = {},
): Promise<any> => {
  return getData({
    endPoint,
    type: 'delete',
    dataParams,
    ...options,
  });
};

/**
 * Convenience function for file uploads
 */
export const apiUpload = async (
  endPoint: string,
  formData: FormData,
  options: Partial<FormDataPostParams> = {},
): Promise<any> => {
  return getFormDataPost({
    endPoint,
    formData,
    type: 'post',
    ...options,
  });
};
