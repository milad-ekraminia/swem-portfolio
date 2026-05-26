export type CheckboxGroup = {
  id: string;
  label: string;
  values: { title: string; fieldName: string }[];
};
export type reportsAddProfileInitialValuesTypes = {
  profileId?: number;
  profileName: string;
  reportType?: string;
  filterProfileFields?: filterProfileField[];
};

type filterProfileField = {
  fieldName?: string;
  fieldType?: number;
  fieldValue?: string | { id: number; caption: string }[];
  filterProfileId?: number;
};
