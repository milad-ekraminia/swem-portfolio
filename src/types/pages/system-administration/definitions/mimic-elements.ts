import { fileSelectionTypeOptions } from '@/enum-data/definitions/enum';

export interface BaseMimicElement {
  active: boolean;
  mimicElementName: string;
  mimicElementGroup: string;
  mimicElementShowType: number;
  mimicElementFileName: string;
  uploadFolder: string;
  mimicElementDefaultElementId: number;
  mimicElementBitZeroElementId: number;
  mimicElementBitOneElementId: number;
  mimicElementBitZeroOneElementId: number;
  mimicElementBitOneZeroElementId: number;
}
export interface MimicElement extends BaseMimicElement {
  id: number;
}
type FileSelectionType = (typeof fileSelectionTypeOptions)[number]['value'];
export interface MimicElementFormData extends BaseMimicElement {
  fileSelectionType: FileSelectionType;
  mimicElementDetails: RelatedElement[];
}

interface BaseRelatedElement {
  componentCondition: number;
  componentConditionEqual: number;
  mimicElementId?: string;
  componentConditionMinimum: number;
  componentConditionMaximum: number;
  conditionElementId: number | null;
}

export interface RelatedElement extends BaseRelatedElement {
  id: number;
  serverId?: number;
  creationTime?: string;
}

export interface RelatedElementFormData extends BaseRelatedElement {
  id: number;
}

export interface MimicElementLookupItem {
  id: number;
  displayName: string;
}
