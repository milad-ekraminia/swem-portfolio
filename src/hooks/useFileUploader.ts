import { useCallback } from 'react';
import { toast } from 'react-toastify';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

interface UploadedFile {
  base64: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export const useFileUploader = (
  onSuccess: (fileData: UploadedFile) => void,
  allowedTypes: string[] = ALLOWED_TYPES,
  maxSize: number = MAX_FILE_SIZE,
) => {
  const validateFile = useCallback(
    (file: File): string | null => {
      if (!allowedTypes.includes(file.type)) {
        return 'File type not allowed. Please upload PNG or JPEG.';
      }
      if (file.size > maxSize) {
        return 'File size exceeds 4MB limit.';
      }
      return null;
    },
    [allowedTypes, maxSize],
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          onSuccess({
            base64: base64String,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          });
        } else {
          toast.error('Error processing the file.');
        }
      };
      reader.readAsDataURL(file);
    },
    [validateFile, onSuccess],
  );

  return {
    handleFileUpload,
  };
};
