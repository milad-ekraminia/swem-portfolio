import {
  getData,
  getFormDataPost,
} from '@/lib/api-method/api-method-functions';
import { getCookie } from './cookies';

const MAIN_URL = import.meta.env.VITE_API_MAIN_URL;
const TENANT = import.meta.env.VITE_API_TENANT;

export async function downloadExcelFileApiWithRow({
  url,
  formData,
}: {
  url: string;
  formData: any;
}) {
  return await getFormDataPost({
    endPoint: url,
    formData,
    type: 'post',
  });
}

export async function downloadExcelFileApi({ url }: { url: string }) {
  return await getData({
    endPoint: url,
    type: 'get',
  });
}

export async function downloadExcelFileApiWithoutRow({
  url,
  formData,
}: {
  url: string;
  formData: any;
}) {
  return await getData({
    endPoint: url,
    type: 'post',
    dataParams: formData,
    isHeaderJson: true,
  });
}

export async function downloadExcelFileTokenApi({ url }: { url: string }) {
  return await getData({
    endPoint: url,
    type: 'get',
  });
}

export async function downloadExcelFileWithUseTokenApi({
  url,
  formData,
}: {
  url: string;
  formData: any;
}) {
  return await getData({
    endPoint: url,
    type: 'get',
    dataParams: formData,
  });
}

export const downloadExcelFile = async ({
  response,
  fileName,
}: {
  response: any;
  fileName: string;
}) => {
  if (!response) {
    console.error('No response data provided.');
    return;
  }

  // Create a filename with the current date
  const filename = `${fileName}_${new Date()
    .toLocaleDateString()
    .replace(/[/]/g, '.')}.xlsx`;

  // Decode base64 string
  const byteCharacters = atob(response); //Decoding: The atob function decodes the base64 encoded string.
  const byteNumbers = new Array(byteCharacters.length)
    .fill(null)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  // Convert to Blob
  const blob = new Blob([byteArray], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Create a download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Trigger the download
  link.click();

  // Clean up URL object
  URL.revokeObjectURL(link.href);
};

export const downloadGetMethodExcelFile = async ({
  excelUrl,
  fileName,
  fileType = 'xlsx',
}: {
  fileName: string;
  excelUrl: string;
  fileType?: string;
}) => {
  // Fetch the Excel file
  const response = await fetch(MAIN_URL + excelUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getCookie('auth_token')}`, // Use the fetched token
      Accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      __tenant: TENANT, // Include tenant header if required
    },
  });
  // Check if the response is OK
  if (!response.ok) {
    throw new Error('Failed to download the Excel file');
  }

  // Create a filename with the current date
  const filename = `${fileName}_${new Date()
    .toLocaleDateString()
    .replace(/[/]/g, '.')}.${fileType}`;

  // Parse response into a Blob
  const blob = await response.blob();

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a download link
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // Trigger the download
  link.click();

  // Clean up URL object
  URL.revokeObjectURL(link.href);
};
