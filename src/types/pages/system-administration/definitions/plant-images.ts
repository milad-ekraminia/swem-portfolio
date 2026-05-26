export interface PlantImage {
  name: string;
  uri: string;
  isBackground: boolean;
  organizationId: number;
  concurrencyStamp: string;
  isDeleted: boolean;
  creatorId: string;
  id: number;
}

export interface PlantImageFormData {
  name: string;
  uri: string;
  isBackground: boolean;
  organizationId: number;
}
