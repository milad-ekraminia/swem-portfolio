export interface Parameter {
  dvDeviceId: number;
  dvLabelId: number;
  dvItemNr: number;
  dvMathOperator: number;
  dvConstantValue?: string;
}

export interface DerivedValue {
  active: boolean;
  dvDescription: string;
  dvRecordValue: number;
  dvThresholdTime: number;
  dvThresholdTimeUnit: number;
  dvFormula: string;
  id?: number;
}

export interface DerivedValueFormData extends DerivedValue {
  derivedValueParametersDetails: Parameter[];
}
