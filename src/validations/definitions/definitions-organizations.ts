import * as yup from 'yup';

export const organizationPlantDetailsSchema = yup.object({
  organizationId: yup.number().required(),
  monthYear: yup.string().required(),
  productionForecast: yup.number().required(),
  unitPriceMultiplier: yup.number().required(),
});

// monthYear ?: string | null | undefined;
// productionForecast ?: number | undefined;
// organizationId: number;
// unitPriceMultiplier: number;

export type organizationPlantDetailsSchemaType = yup.InferType<
  typeof organizationPlantDetailsSchema
>;

export const addOrganizationResolver = yup.object({
  active: yup.boolean().optional(),
  organizationName: yup.string().max(50).required(),
  organizationDescription: yup.string().max(100),
  organizationParentId: yup.number().optional(),
  locationId: yup
    .number()
    .required()
    .nullable()
    .test((value) => value !== null),
  organizationParentNames: yup.string(),
  organizationElectricDensity: yup.number().when(['$ng', '$re'], {
    is: ({ ng, re }: { ng: number; re: number }) => ng === 0 && re === 0,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationNaturalGasDensity: yup.number().when(['$ng', '$re'], {
    is: ({ ng, re }: { ng: number; re: number }) => ng === 0 && re === 0,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationType: yup.number().when(['$ng', '$re'], {
    is: ({ ng, re }: { ng: number; re: number }) => ng === 0 || re === 0,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationStationType: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationStationEBTIntegration: yup.boolean().optional(),
  organizationStationEBTIntCode: yup.string().max(50),
  organizationParentRMSAStationId: yup.number().optional(),
  organizationStationEBTIntUserName: yup.string().max(50).optional(),
  organizationStationEBTIntPassword: yup.string().max(50).optional(),
  organizationStationEBTIntegrationAutomatic: yup.boolean().optional(),
  organizationStationNGSourceType: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationStationIsConductionService: yup.boolean().optional(),
  organizationIntegrationCode: yup.string().max(14),
  organizationStationActive: yup.boolean().optional(),
  organizationOperatorUserName: yup.string().max(10),
  organizationOperatorPassword: yup.string().max(10),
  organizationStationAddRMSAConsToEBTTotal: yup.boolean().optional(),
  organizationStationUltrasonicDeviceId: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationSubstitutionOrganizationId: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationIsRMSAFreeConsumerStation: yup.boolean().optional(),
  organizationOperatorSHVSelection: yup.boolean().optional(),
  organizationSHVSelection: yup.boolean().optional(),
  organizationIntegrationActive: yup.boolean().optional(),
  organizationStationType2: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationIsStationFreeConsumer: yup.boolean().optional(),
  organizationStationAddWrongConsumptionToTotal: yup.boolean().optional(),
  organizationStationFuelLineDeviceId: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationGCOrganizationId: yup.number().when('$ng', {
    is: ({ ng }: { ng: number }) => ng === 1,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationRoundConsumption: yup.boolean().optional(),
  organizationShowOnTree: yup.boolean().when(['$ng', '$re'], {
    is: ({ ng, re }: { ng: number; re: number }) => ng === 0 || re === 0,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationPlantEnergyType: yup.number().when('organizationType', {
    is: (val: number) => [3, 4].includes(val),
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationPlantLowVoltageDeviceId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value)),
  organizationPlantMediumVoltageDeviceId: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value)),
  organizationPlantProtectionRelayDeviceId: yup.number().required(),
  organizationPlantMimicDiagramId: yup.number().when('organizationType', {
    is: (val: number) => [3, 4].includes(val),
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  organizationPlantSensorDeviceId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value)),
  hasActiveAlarm: yup.number().nullable(), // ??
  organizationPlantDetails: yup
    .array()
    .of(organizationPlantDetailsSchema)
    .optional(),
  coordinateInformation: yup.string().optional(),
});

export const addOrganizationInitialValues = {
  active: true, //DONE
  organizationName: '', //DONE
  organizationDescription: '', //DONE
  organizationParentId: 0, //DONE
  locationId: null, //DONE
  organizationParentNames: '', //DONE
  organizationElectricDensity: 0.0, //DONE
  organizationNaturalGasDensity: 0.0, //DONE
  organizationType: 1, //DONE
  organizationStationType: 1, //DONE
  organizationStationEBTIntegration: false, //DONE
  organizationStationEBTIntCode: '', //DONE
  organizationParentRMSAStationId: 0, //DONE
  organizationStationEBTIntUserName: '', //DONE
  organizationStationEBTIntPassword: '', //DONE
  organizationStationEBTIntegrationAutomatic: false, // DONE
  organizationStationNGSourceType: 1, //DONE
  organizationStationIsConductionService: false, //DONE
  organizationIntegrationCode: '', //DONE
  organizationStationActive: true, //DONE
  organizationOperatorUserName: '', //DONE
  organizationOperatorPassword: '', //DONE
  organizationStationAddRMSAConsToEBTTotal: false, //DONE
  organizationStationUltrasonicDeviceId: 0, //DONE
  organizationSubstitutionOrganizationId: 0, //DONE
  organizationIsRMSAFreeConsumerStation: false, // DONE
  organizationOperatorSHVSelection: false, //DONE
  organizationSHVSelection: false, //DONE
  organizationIntegrationActive: false, //DONE
  organizationStationType2: 0, //DONE
  organizationIsStationFreeConsumer: false, //DONE
  organizationStationAddWrongConsumptionToTotal: false, //DONE
  organizationStationFuelLineDeviceId: 0, //DONE
  organizationGCOrganizationId: 0, //DONE
  organizationRoundConsumption: true, //DONE
  organizationShowOnTree: true, //DONE
  organizationPlantEnergyType: 1, //DONE
  organizationPlantLowVoltageDeviceId: null, //DONE
  organizationPlantMediumVoltageDeviceId: null, //DONE
  organizationPlantProtectionRelayDeviceId: 0, //DONE
  organizationPlantMimicDiagramId: 0, //DONE
  organizationPlantSensorDeviceId: 0, //DONE
  hasActiveAlarm: 0,
  organizationPlantDetails: [],
  coordinateInformation: '',
};

export const editOrganizationInitialValues = (dataInfo: any) => {
  return {
    orgId: dataInfo?.id,
    active: dataInfo?.active,
    organizationName: dataInfo?.organizationName,
    organizationDescription: dataInfo?.organizationDescription,
    organizationParentId: dataInfo?.organizationParentId,
    locationId: dataInfo?.locationId,
    organizationParentNames: dataInfo?.organizationParentNames,
    organizationElectricDensity: dataInfo?.organizationElectricDensity,
    organizationNaturalGasDensity: dataInfo?.organizationNaturalGasDensity,
    organizationType: dataInfo?.organizationType,
    organizationStationType: dataInfo?.organizationStationType,
    organizationStationEBTIntegration:
      dataInfo?.organizationStationEBTIntegration,
    organizationStationEBTIntCode: dataInfo?.organizationStationEBTIntCode,
    organizationParentRMSAStationId: dataInfo?.organizationParentRMSAStationId,
    organizationStationEBTIntUserName:
      dataInfo?.organizationStationEBTIntUserName,
    organizationStationEBTIntPassword:
      dataInfo?.organizationStationEBTIntPassword,
    organizationStationEBTIntegrationAutomatic:
      dataInfo?.organizationStationEBTIntegrationAutomatic,
    organizationStationNGSourceType: dataInfo?.organizationStationNGSourceType,
    organizationStationIsConductionService:
      dataInfo?.organizationStationIsConductionService,
    organizationIntegrationCode: dataInfo?.organizationIntegrationCode,
    organizationStationActive: dataInfo?.organizationStationActive,
    organizationOperatorUserName: dataInfo?.organizationOperatorUserName,
    organizationOperatorPassword: dataInfo?.organizationOperatorPassword,
    organizationStationAddRMSAConsToEBTTotal:
      dataInfo?.organizationStationAddRMSAConsToEBTTotal,
    organizationStationUltrasonicDeviceId:
      dataInfo?.organizationStationUltrasonicDeviceId,
    organizationSubstitutionOrganizationId:
      dataInfo?.organizationSubstitutionOrganizationId,
    organizationIsRMSAFreeConsumerStation:
      dataInfo?.organizationIsRMSAFreeConsumerStation,
    organizationOperatorSHVSelection:
      dataInfo?.organizationOperatorSHVSelection,
    organizationSHVSelection: dataInfo?.organizationSHVSelection,
    organizationIntegrationActive: dataInfo?.organizationIntegrationActive,
    organizationStationType2: dataInfo?.organizationStationType2,
    organizationIsStationFreeConsumer:
      dataInfo?.organizationIsStationFreeConsumer,
    organizationStationAddWrongConsumptionToTotal:
      dataInfo?.organizationStationAddWrongConsumptionToTotal,
    organizationStationFuelLineDeviceId:
      dataInfo?.organizationStationFuelLineDeviceId,
    organizationGCOrganizationId: dataInfo?.organizationGCOrganizationId,
    organizationRoundConsumption: dataInfo?.organizationRoundConsumption,
    organizationShowOnTree: dataInfo?.organizationShowOnTree,
    organizationPlantEnergyType: dataInfo?.organizationPlantEnergyType,
    organizationPlantLowVoltageDeviceId:
      dataInfo?.organizationPlantLowVoltageDeviceId,
    organizationPlantMediumVoltageDeviceId:
      dataInfo?.organizationPlantMediumVoltageDeviceId,
    organizationPlantProtectionRelayDeviceId:
      dataInfo?.organizationPlantProtectionRelayDeviceId,
    organizationPlantMimicDiagramId: dataInfo?.organizationPlantMimicDiagramId,
    organizationPlantSensorDeviceId: dataInfo?.organizationPlantSensorDeviceId,
    hasActiveAlarm: dataInfo?.hasActiveAlarm,
    organizationPlantDetails: dataInfo?.organizationPlantDetails,
    coordinateInformation: dataInfo?.coordinateInformation,
  };
};

export type AddOrganizationProps = yup.InferType<
  typeof addOrganizationResolver
>;
