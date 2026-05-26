import * as XLSX from 'xlsx';

export const convertExcelToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryData = event.target?.result as ArrayBuffer;
      const workbook = XLSX.read(binaryData, { type: 'array' });

      // Convert the worksheet to a binary string (Excel format)
      const excelBinary = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'binary',
      });

      // Convert the binary string to a base64-encoded string
      const base64String = btoa(excelBinary);

      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
};
