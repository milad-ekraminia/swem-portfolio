 
export type Headers = {
  Authorization?: string;
  'Access-Control-Allow-Origin'?: string;
  'Content-Type'?: string;
  Accept?: string;
  'Access-Control-Allow-Credentials'?: string;
  'Access-Control-Allow-Methods'?: string;
  'Access-Control-Allow-Headers'?: string;
  'Accept-Language'?: string;
  __tenant?: string;
  RequestVerificationToken?: string;
  'X-Requested-With'?: string;
};

export type RequestType = 'get' | 'post' | 'delete';
export type DataParams = Record<string, any>; // Represents the params for the request

export type GetData = {
  endPoint: string;
  type: RequestType;
  dataParams?: DataParams; // Optional to allow default empty object
  isToken?: boolean; // Optional to allow default false
  isHeaderJson?: boolean; // Optional to allow default false
  default_token?: string | null; // Optional to allow default null\
  hasTenant?: boolean; // is needed only in login api method
  isExcel?: boolean; // is needed only when download excel file
};

export type ResponseData = {
  status: number;
  [key: string]: any; // This allows any other properties from the response data
};

export type ErrorResponse = {
  status: number;
  error: any; // This can be more specific if the error structure is known
};

export type ApiErrorResponse = {
  errors?: Record<string, any>; // Define a flexible structure for 'errors'
  message?: string; // Optional message field
};

export type dataParamsProps = {
  'api-version': string | number;
  maxResultCount: number;
  skipCount: number;
  sorting?: string;
  filterText?: string;
  Filter?: string;
  Id?: number;
  id?: number;
};
