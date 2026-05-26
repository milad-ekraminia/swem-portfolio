interface ValidFileProps {
  file: File;
  types: string[];
  maxFileSize?: number;
}

export const validateFile = ({
  file,
  types,
  maxFileSize = 4 * 1000 * 1000,
}: ValidFileProps) => {
  if (!types.includes(file.type)) {
    return 'File type not allowed. Please upload PNG or JPEG.';
  }
  if (file.size > maxFileSize) {
    return `File size exceeds 4 MB limit.`;
  }

  return null;
};
