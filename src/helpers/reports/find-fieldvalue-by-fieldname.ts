import { useCallback } from 'react';

export const useFormDataValueChangeByFieldName = (fields: any[]) => {
  const formDataValueChangeByFieldName = useCallback(
    (fieldName: string) => {
      const index = fields.findIndex(
        (field: any) =>
          field.fieldName ===
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1) ||
          field.fieldName === fieldName,
      );
      return `filterProfileFields.${index}.fieldValue`;
    },
    [fields],
  );

  return formDataValueChangeByFieldName;
};
