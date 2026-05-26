import axios from 'axios';

const BASE_URL = import.meta.env.VITE_FILE_SERVER_URL as string;

type UploadFolder = string;

// -------- GENERAL UPLOADS (public/uploads) --------

export const handleUpload = async (file: File, folder: UploadFolder) => {
  if (!file) {
    alert('Please select a file first!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      `${BASE_URL}/upload/${folder}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // server returns { filePath: '/uploads/<folder>/<filename>' }
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    alert('File upload failed.');
  }
};

// -------- MIMIC ELEMENT UPLOADS (public/uploads/mimic-elements) --------

export const handleMimicElementUpload = async (
  file: File,
  folder: UploadFolder,
) => {
  if (!file) {
    alert('Please select a file first!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      `${BASE_URL}/upload-mimic/${folder}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // server returns { filePath: '/uploads/mimic-elements/<folder>/<filename>' }
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    alert('File upload failed.');
  }
};

// -------- FILE INFO (GENERAL) --------

export const fetchUploadedFile = async (fileName: string, folder: string) => {
  if (!fileName) return;

  try {
    const encodedFileName = encodeURIComponent(fileName);
    const response = await axios.get(
      `${BASE_URL}/file-info/${folder}/${encodedFileName}`,
    );
    return response.data;
  } catch (error) {
    console.error('fetch file error:', error);
  }
};

// -------- FILE INFO (MIMIC) --------

export const fetchMimicUploadedFile = async (
  fileName: string,
  folder: string,
) => {
  if (!fileName) return;

  try {
    const encodedFileName = encodeURIComponent(fileName);
    const response = await axios.get(
      `${BASE_URL}/mimic-file-info/${folder}/${encodedFileName}`,
    );
    return response.data;
  } catch (error) {
    console.error('fetch mimic file error:', error);
  }
};

// -------- DELETE (GENERAL) --------
// Example folders: 'plant-images', 'plant-videos', etc.

export const deleteUploadedFile = async (fileName: string, folder: string) => {
  if (!fileName) return;

  try {
    const encodedFileName = encodeURIComponent(fileName);
    const response = await axios.delete(
      `${BASE_URL}/uploads/${folder}/${encodedFileName}`,
    );
    return response.data;
  } catch (error) {
    console.error('delete file error:', error);
  }
};

// -------- DELETE (MIMIC) --------
// folder here is the *inner* folder under mimic-elements (e.g. 'pumps', 'valves', etc.)

export const deleteMimicUploadedFile = async (
  fileName: string,
  folder: string,
) => {
  if (!fileName) return;

  try {
    const encodedFileName = encodeURIComponent(fileName);
    const response = await axios.delete(
      `${BASE_URL}/uploads/mimic-elements/${folder}/${encodedFileName}`,
    );
    return response.data;
  } catch (error) {
    console.error('delete mimic file error:', error);
  }
};
