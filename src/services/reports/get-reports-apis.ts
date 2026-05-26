import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

// demand reports
export async function getDemandReportApi({ dataParams }: { dataParams: any }) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-demand-instants/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      active: true,
      PhaseTotal: null,
      PhaseL1: null,
      PhaseL2: null,
      PhaseL3: null,
      DemCurrent: null,
      DemCurrentDateTime: null,
      DemActivePowImp: null,
      DemActivePowImpDateTime: null,
      DemActivePowExp: null,
      DemActivePowExpDateTime: null,
      DemReactivePow: null,
      DemReactivePowDateTime: null,
    },
    type: 'post',
  });
}

// monyhly demand reports
export async function getMonthlyDemandReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-demand-monthlies/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      active: true,
      PhaseTotal: null,
      PhaseL1: null,
      PhaseL2: null,
      PhaseL3: null,
      DemCurrent: null,
      DemCurrentDateTime: null,
      DemActivePowImp: null,
      DemActivePowImpDateTime: null,
      DemActivePowExp: null,
      DemActivePowExpDateTime: null,
      DemReactivePow: null,
      DemReactivePowDateTime: null,
    },
    type: 'post',
  });
}

// harmonic reports
export async function getHarmonikReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-harmonics/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      Active: true,
      DeviceIdMin: null,
      DeviceIdMax: null,
      DeviceSerialNrMin: null,
      DeviceSerialNrMax: null,
      DeviceDescription: null,
      DeviceAccessPointIdMin: null,
      DeviceAccessPointIdMax: null,
      DeviceOrganizationIdMin: null,
      DeviceOrganizationIdMax: null,
      InsDeviceDateTimeMin: null,
      InsDeviceDateTimeMax: null,
      HarmonicType: null,
      HarmonicPhaseNrMin: null,
      HarmonicPhaseNrMax: null,
      Harmonic1Min: null,
      Harmonic1Max: null,
      Harmonic3Min: null,
      Harmonic3Max: null,
      Harmonic5Min: null,
      Harmonic5Max: null,
      Harmonic7Min: null,
      Harmonic7Max: null,
      Harmonic9Min: null,
      Harmonic9Max: null,
      Harmonic11Min: null,
      Harmonic11Max: null,
      Harmonic13Min: null,
      Harmonic13Max: null,
      Harmonic15Min: null,
      Harmonic15Max: null,
      Harmonic17Min: null,
      Harmonic17Max: null,
      Harmonic19Min: null,
      Harmonic19Max: null,
      Harmonic21Min: null,
      Harmonic21Max: null,
      Harmonic23Min: null,
      Harmonic23Max: null,
      Harmonic25Min: null,
      Harmonic25Max: null,
      Harmonic27Min: null,
      Harmonic27Max: null,
      Harmonic29Min: null,
      Harmonic29Max: null,
      Harmonic31Min: null,
      Harmonic31Max: null,
      Harmonic33Min: null,
      Harmonic33Max: null,
      Harmonic35Min: null,
      Harmonic35Max: null,
      Harmonic37Min: null,
      Harmonic37Max: null,
      Harmonic39Min: null,
      Harmonic39Max: null,
      Harmonic41Min: null,
      Harmonic41Max: null,
      Harmonic43Min: null,
      Harmonic43Max: null,
      Harmonic45Min: null,
      Harmonic45Max: null,
      Harmonic47Min: null,
      Harmonic47Max: null,
      Harmonic49Min: null,
      Harmonic49Max: null,
      Harmonic51Min: null,
      Harmonic51Max: null,
      DeviceModelName: null,
      DeviceModelCode: null,
      DeviceOrganizationName: null,
    },
    type: 'post',
  });
}

// Minimum-Maximum Değer reports
export async function getMinimumMaximumReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-min-max-values/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      Active: true,
      DeviceIdMin: null,
      DeviceIdMax: null,
      DeviceSerialNrMin: null,
      DeviceSerialNrMax: null,
      DeviceDescription: null,
      DeviceAccessPointIdMin: null,
      DeviceAccessPointIdMax: null,
      DeviceOrganizationIdMin: null,
      DeviceOrganizationIdMax: null,
      InsDeviceDateTimeMin: null,
      InsDeviceDateTimeMax: null,
      MinVoltAvgMin: null,
      MinVoltAvgMax: null,
      MinVoltPhase1Min: null,
      MinVoltPhase1Max: null,
      MinVoltPhase2Min: null,
      MinVoltPhase2Max: null,
      MinVoltPhase3Min: null,
      MinVoltPhase3Max: null,
      MinVoltLLAvgMin: null,
      MinVoltLLAvgMax: null,
      MinVoltLL12Min: null,
      MinVoltLL12Max: null,
      MinVoltLL23Min: null,
      MinVoltLL23Max: null,
      MinVoltLL31Min: null,
      MinVoltLL31Max: null,
      MinCurTotalMin: null,
      MinCurTotalMax: null,
      MinCurPhase1Min: null,
      MinCurPhase1Max: null,
      MinCurPhase2Min: null,
      MinCurPhase2Max: null,
      MinCurPhase3Min: null,
      MinCurPhase3Max: null,
      MinCurNeutralMin: null,
      MinCurNeutralMax: null,
      MinActPowerTotalMin: null,
      MinActPowerTotalMax: null,
      MinActPowerPhase1Min: null,
      MinActPowerPhase1Max: null,
      MinActPowerPhase2Min: null,
      MinActPowerPhase2Max: null,
      MinActPowerPhase3Min: null,
      MinActPowerPhase3Max: null,
      MinReactPowerTotalMin: null,
      MinReactPowerTotalMax: null,
      MinReactPowerPhase1Min: null,
      MinReactPowerPhase1Max: null,
      MinReactPowerPhase2Min: null,
      MinReactPowerPhase2Max: null,
      MinReactPowerPhase3Min: null,
      MinReactPowerPhase3Max: null,
      MinApperantPowerTotalMin: null,
      MinApperantPowerTotalMax: null,
      MinApperantPowerPhase1Min: null,
      MinApperantPowerPhase1Max: null,
      MinApperantPowerPhase2Min: null,
      MinApperantPowerPhase2Max: null,
      MinApperantPowerPhase3Min: null,
      MinApperantPowerPhase3Max: null,
      MinCosAvgMin: null,
      MinCosAvgMax: null,
      MinCosPhase1Min: null,
      MinCosPhase1Max: null,
      MinCosPhase2Min: null,
      MinCosPhase2Max: null,
      MinCosPhase3Min: null,
      MinCosPhase3Max: null,
      MinPowerFactorAvgMin: null,
      MinPowerFactorAvgMax: null,
      MinPowerFactorPhase1Min: null,
      MinPowerFactorPhase1Max: null,
      MinPowerFactorPhase2Min: null,
      MinPowerFactorPhase2Max: null,
      MinPowerFactorPhase3Min: null,
      MinPowerFactorPhase3Max: null,
      MinFrequencyMin: null,
      MinFrequencyMax: null,
      MinFrequencyPhase1Min: null,
      MinFrequencyPhase1Max: null,
      MinFrequencyPhase2Min: null,
      MinFrequencyPhase2Max: null,
      MinFrequencyPhase3Min: null,
      MinFrequencyPhase3Max: null,
      MinTHDVoltageTotalMin: null,
      MinTHDVoltageTotalMax: null,
      MinTHDVoltagePhase1Min: null,
      MinTHDVoltagePhase1Max: null,
      MinTHDVoltagePhase2Min: null,
      MinTHDVoltagePhase2Max: null,
      MinTHDVoltagePhase3Min: null,
      MinTHDVoltagePhase3Max: null,
      MinTHDCurrentTotalMin: null,
      MinTHDCurrentTotalMax: null,
      MinTHDCurrentPhase1Min: null,
      MinTHDCurrentPhase1Max: null,
      MinTHDCurrentPhase2Min: null,
      MinTHDCurrentPhase2Max: null,
      MinTHDCurrentPhase3Min: null,
      MinTHDCurrentPhase3Max: null,
      DeviceModelName: null,
      DeviceModelCode: null,
      DeviceVoltTransValueMin: null,
      DeviceVoltTransValueMax: null,
      DeviceCurrTransValueMin: null,
      DeviceCurrTransValueMax: null,
      DeviceOrganizationName: null,
    },
    type: 'post',
  });
}

// Arşiv Veri reports
export async function getArchiveReportApi({ dataParams }: { dataParams: any }) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/io-device-archives/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      Active: true,
      DeviceIdMin: null,
      DeviceIdMax: null,
      DeviceSerialNrMin: null,
      DeviceSerialNrMax: null,
      DeviceDescription: null,
      DeviceAccessPointIdMin: null,
      DeviceAccessPointIdMax: null,
      DeviceOrganizationIdMin: null,
      DeviceOrganizationIdMax: null,
      ArcDateTimeMin: null,
      ArcDateTimeMax: null,
      LabelIdMin: null,
      LabelIdMax: null,
      IoDataLabelCode: null,
      IoDataValueMin: null,
      IoDataValueMax: null,
      DeviceModelName: null,
      DeviceModelCode: null,
      DeviceOrganizationName: null,
    },
    type: 'post',
  });
}

// periodic reports
export async function getElecConsumptionPeriodicReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-hourly-consumptions/get-elec-cons-periodic?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}
export async function getElecConsumptionPeriodicChartReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-elec-hourly-consumptions/get-elec-cons-periodic-chart?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

// index values
export async function getDeviceElecIndexValueReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  const formattedDataParams = { ...dataParams };
  if (dataParams.sorting?.length > 0) {
    formattedDataParams.sorting = dataParams.sorting
      .map((sortOption: any) => {
        let sort = '';
        sort += sortOption.sortName;
        if (sortOption.direction === 'desc') sort += ` DESC`;
        return sort;
      })
      .join(',');
  } else dataParams.sorting = '';

  return await getFormDataPost({
    endPoint: `app/device-elec-index-values/get-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: '',
      active: true,
      deviceIdMin: null,
      deviceIdMax: null,
      deviceSerialNrMin: null,
      deviceSerialNrMax: null,
      deviceDescription: '',
      deviceAccessPointIdMin: null,
      deviceAccessPointIdMax: null,
      deviceOrganizationIdMin: null,
      deviceOrganizationIdMax: null,
      insDeviceDateTimeMin: null,
      insDeviceDateTimeMax: null,
      indActive1ImpMin: null,
      indActive1ImpMax: null,
      indActive1T1ImpMin: null,
      indActive1T1ImpMax: null,
      indActive1T2ImpMin: null,
      indActive1T2ImpMax: null,
      indActive1T3ImpMin: null,
      indActive1T3ImpMax: null,
      indActive2ImpMin: null,
      indActive2ImpMax: null,
      indReactive1ImpMin: null,
      indReactive1ImpMax: null,
      indReactive1T1ImpMin: null,
      indReactive1T1ImpMax: null,
      indReactive1T2ImpMin: null,
      indReactive1T2ImpMax: null,
      indReactive1T3ImpMin: null,
      indReactive1T3ImpMax: null,
      indReactive2ImpMin: null,
      indReactive2ImpMax: null,
      indReactiveInd1ImpMin: null,
      indReactiveInd1ImpMax: null,
      indReactiveInd1T1ImpMin: null,
      indReactiveInd1T1ImpMax: null,
      indReactiveInd1T2ImpMin: null,
      indReactiveInd1T2ImpMax: null,
      indReactiveInd1T3ImpMin: null,
      indReactiveInd1T3ImpMax: null,
      indReactiveInd2ImpMin: null,
      indReactiveInd2ImpMax: null,
      indReactiveCap1ImpMin: null,
      indReactiveCap1ImpMax: null,
      indReactiveCap1T1ImpMin: null,
      indReactiveCap1T1ImpMax: null,
      indReactiveCap1T2ImpMin: null,
      indReactiveCap1T2ImpMax: null,
      indReactiveCap1T3ImpMin: null,
      indReactiveCap1T3ImpMax: null,
      indReactiveCap2ImpMin: null,
      indReactiveCap2ImpMax: null,
      indActive1ExpMin: null,
      indActive1ExpMax: null,
      indActive1T1ExpMin: null,
      indActive1T1ExpMax: null,
      indActive1T2ExpMin: null,
      indActive1T2ExpMax: null,
      indActive1T3ExpMin: null,
      indActive1T3ExpMax: null,
      indActive2ExpMin: null,
      indActive2ExpMax: null,
      indReactive1ExpMin: null,
      indReactive1ExpMax: null,
      indReactive1T1ExpMin: null,
      indReactive1T1ExpMax: null,
      indReactive1T2ExpMin: null,
      indReactive1T2ExpMax: null,
      indReactive1T3ExpMin: null,
      indReactive1T3ExpMax: null,
      indReactive2ExpMin: null,
      indReactive2ExpMax: null,
      indReactiveInd1ExpMin: null,
      indReactiveInd1ExpMax: null,
      indReactiveInd1T1ExpMin: null,
      indReactiveInd1T1ExpMax: null,
      indReactiveInd1T2ExpMin: null,
      indReactiveInd1T2ExpMax: null,
      indReactiveInd1T3ExpMin: null,
      indReactiveInd1T3ExpMax: null,
      indReactiveInd2ExpMin: null,
      indReactiveInd2ExpMax: null,
      indReactiveCap1ExpMin: null,
      indReactiveCap1ExpMax: null,
      indReactiveCap1T1ExpMin: null,
      indReactiveCap1T1ExpMax: null,
      indReactiveCap1T2ExpMin: null,
      indReactiveCap1T2ExpMax: null,
      indReactiveCap1T3ExpMin: null,
      indReactiveCap1T3ExpMax: null,
      indReactiveCap2ExpMin: null,
      indReactiveCap2ExpMax: null,
      deviceModelName: null,
      deviceModelCode: null,
      deviceVoltTransValueMin: null,
      deviceVoltTransValueMax: null,
      deviceCurrTransValueMin: null,
      deviceCurrTransValueMax: null,
      deviceOrganizationName: '',
      indDailyReactiveInductiveRateMin: null,
      indDailyReactiveInductiveRateMax: null,
      indDailyReactiveCapacitiveRateMin: null,
      indDailyReactiveCapacitiveRateMax: null,
      indMonthlyReactiveInductiveRateMin: null,
      indMonthlyReactiveInductiveRateMax: null,
      indMonthlyReactiveCapacitiveRateMin: null,
      indMonthlyReactiveCapacitiveRateMax: null,
      indActive1T4ImpMin: null,
      indActive1T4ImpMax: null,
      indCurrentHourActive1ImpConsMin: null,
      indCurrentHourActive1ImpConsMax: null,
      indCurrentHourActive1ExpConsMin: null,
      indCurrentHourActive1ExpConsMax: null,
      indCurrentDayActive1ImpConsMin: null,
      indCurrentDayActive1ImpConsMax: null,
      indCurrentDayActive1ExpConsMin: null,
      indCurrentDayActive1ExpConsMax: null,
      indCurrentMonthActive1ImpConsMin: null,
      indCurrentMonthActive1ImpConsMax: null,
      indCurrentMonthActive1ExpConsMin: null,
      indCurrentMonthActive1ExpConsMax: null,
      indCurrentYearActive1ImpConsMin: null,
      indCurrentYearActive1ImpConsMax: null,
      indCurrentYearActive1ExpConsMin: null,
      indCurrentYearActive1ExpConsMax: null,
    },
    type: 'post',
  });
}
export async function getDeviceElecIndexValueChartReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-elec-index-values/index-value-chart-list?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

//inverter instant value
export async function getDeviceElecInverterInstantValueReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }
  return await getFormDataPost({
    endPoint: `app/device-elec-inverter-instant-values/get-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: '',
      active: true,
      deviceIdMin: null,
      deviceIdMax: null,
      deviceSerialNrMin: null,
      deviceSerialNrMax: null,
      deviceDescription: '',
      deviceAccessPointIdMin: null,
      deviceAccessPointIdMax: null,
      deviceOrganizationIdMin: null,
      deviceOrganizationIdMax: null,
      deviceModelName: '',
      deviceModelCode: '',
      deviceOrganizationName: '',
      insDeviceDateTimeMin: null,
      insDeviceDateTimeMax: null,
      invWorkingTotalHourMin: null,
      invWorkingTotalHourMax: null,
      invCurrentDayProductionMin: null,
      invCurrentDayProductionMax: null,
      invStatusMin: null,
      invStatusMax: null,
      invManStatusMin: null,
      invManStatusMax: null,
      invInnerTemperatureMin: null,
      invInnerTemperatureMax: null,
      invHeatSinkTemperatureMin: null,
      invHeatSinkTemperatureMax: null,
      invTransformerTemperatureMin: null,
      invTransformerTemperatureMax: null,
      invOtherTemperatureMin: null,
      invOtherTemperatureMax: null,
      invACVoltAvgMin: null,
      invACVoltAvgMax: null,
      invACVoltPhase1Min: null,
      invACVoltPhase1Max: null,
      invACVoltPhase2Min: null,
      invACVoltPhase2Max: null,
      invACVoltPhase3Min: null,
      invACVoltPhase3Max: null,
      invACVoltLLAvgMin: null,
      invACVoltLLAvgMax: null,
      invACVoltLL12Min: null,
      invACVoltLL12Max: null,
      invACVoltLL23Min: null,
      invACVoltLL23Max: null,
      invACVoltLL31Min: null,
      invACVoltLL31Max: null,
      invACCurTotalMin: null,
      invACCurTotalMax: null,
      invACCurPhase1Min: null,
      invACCurPhase1Max: null,
      invACCurPhase2Min: null,
      invACCurPhase2Max: null,
      invACCurPhase3Min: null,
      invACCurPhase3Max: null,
      invACActPowerTotalMin: null,
      invACActPowerTotalMax: null,
      invACReactPowerTotalMin: null,
      invACReactPowerTotalMax: null,
      invACApperantPowerTotalMin: null,
      invACApperantPowerTotalMax: null,
      invACCosAvgMin: null,
      invACCosAvgMax: null,
      invACPowerFactorAvgMin: null,
      invACPowerFactorAvgMax: null,
      invACFrequencyMin: null,
      invACFrequencyMax: null,
      invDCVoltPhase1Min: null,
      invDCVoltPhase1Max: null,
      invDCVoltPhase2Min: null,
      invDCVoltPhase2Max: null,
      invDCVoltPhase3Min: null,
      invDCVoltPhase3Max: null,
      invDCVoltPhase4Min: null,
      invDCVoltPhase4Max: null,
      invDCCurrPhase1Min: null,
      invDCCurrPhase1Max: null,
      invDCCurrPhase2Min: null,
      invDCCurrPhase2Max: null,
      invDCCurrPhase3Min: null,
      invDCCurrPhase3Max: null,
      invDCCurrPhase4Min: null,
      invDCCurrPhase4Max: null,
      invDCActPowerTotalMin: null,
      invDCActPowerTotalMax: null,
      invStringCurrPhase1: '',
      invStringCurrPhase2: '',
      invStringCurrPhase3: '',
      invStringCurrPhase4: '',
    },
    type: 'post',
  });
}
export async function getDeviceElecInverterInstantValueChartReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-elec-inverter-instant-values/inverter-instant-value-chart-list?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

// sensor value
export async function getIODeviceSensorValueReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }
  return await getFormDataPost({
    endPoint: `app/io-device-sensor-values/get-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: '',
      active: true,
      deviceIdMin: null,
      deviceIdMax: null,
      deviceSerialNrMin: null,
      deviceSerialNrMax: null,
      deviceDescription: '',
      deviceAccessPointIdMin: null,
      deviceAccessPointIdMax: null,
      deviceOrganizationIdMin: null,
      deviceOrganizationIdMax: null,
      deviceModelName: '',
      deviceModelCode: '',
      deviceOrganizationName: '',
      insDeviceDateTimeMin: null,
      insDeviceDateTimeMax: null,
      invWorkingTotalHourMin: null,
      invWorkingTotalHourMax: null,
      invCurrentDayProductionMin: null,
      invCurrentDayProductionMax: null,
      invStatusMin: null,
      invStatusMax: null,
      invManStatusMin: null,
      invManStatusMax: null,
      invInnerTemperatureMin: null,
      invInnerTemperatureMax: null,
      invHeatSinkTemperatureMin: null,
      invHeatSinkTemperatureMax: null,
      invTransformerTemperatureMin: null,
      invTransformerTemperatureMax: null,
      invOtherTemperatureMin: null,
      invOtherTemperatureMax: null,
      invACVoltAvgMin: null,
      invACVoltAvgMax: null,
      invACVoltPhase1Min: null,
      invACVoltPhase1Max: null,
      invACVoltPhase2Min: null,
      invACVoltPhase2Max: null,
      invACVoltPhase3Min: null,
      invACVoltPhase3Max: null,
      invACVoltLLAvgMin: null,
      invACVoltLLAvgMax: null,
      invACVoltLL12Min: null,
      invACVoltLL12Max: null,
      invACVoltLL23Min: null,
      invACVoltLL23Max: null,
      invACVoltLL31Min: null,
      invACVoltLL31Max: null,
      invACCurTotalMin: null,
      invACCurTotalMax: null,
      invACCurPhase1Min: null,
      invACCurPhase1Max: null,
      invACCurPhase2Min: null,
      invACCurPhase2Max: null,
      invACCurPhase3Min: null,
      invACCurPhase3Max: null,
      invACActPowerTotalMin: null,
      invACActPowerTotalMax: null,
      invACReactPowerTotalMin: null,
      invACReactPowerTotalMax: null,
      invACApperantPowerTotalMin: null,
      invACApperantPowerTotalMax: null,
      invACCosAvgMin: null,
      invACCosAvgMax: null,
      invACPowerFactorAvgMin: null,
      invACPowerFactorAvgMax: null,
      invACFrequencyMin: null,
      invACFrequencyMax: null,
      invDCVoltPhase1Min: null,
      invDCVoltPhase1Max: null,
      invDCVoltPhase2Min: null,
      invDCVoltPhase2Max: null,
      invDCVoltPhase3Min: null,
      invDCVoltPhase3Max: null,
      invDCVoltPhase4Min: null,
      invDCVoltPhase4Max: null,
      invDCCurrPhase1Min: null,
      invDCCurrPhase1Max: null,
      invDCCurrPhase2Min: null,
      invDCCurrPhase2Max: null,
      invDCCurrPhase3Min: null,
      invDCCurrPhase3Max: null,
      invDCCurrPhase4Min: null,
      invDCCurrPhase4Max: null,
      invDCActPowerTotalMin: null,
      invDCActPowerTotalMax: null,
      invStringCurrPhase1: '',
      invStringCurrPhase2: '',
      invStringCurrPhase3: '',
      invStringCurrPhase4: '',
    },
    type: 'post',
  });
}
export async function getIODeviceSensorValueChartReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/io-device-sensor-values/io-sensor-values-chart-list?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

// instant vslues
export async function getDeviceElecInstantValueReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-instant-values/get-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: null,
      active: true,
      deviceIdMin: null,
      deviceIdMax: null,
      deviceSerialNrMin: null,
      deviceSerialNrMax: null,
      deviceDescription: null,
      deviceAccessPointIdMin: null,
      deviceAccessPointIdMax: null,
      deviceOrganizationIdMin: null,
      deviceOrganizationIdMax: null,
      deviceModelName: null,
      deviceModelCode: null,
      deviceOrganizationName: null,
      consStartDateTimeMin: null,
      consStartDateTimeMax: null,
      consEndDateTimeMin: null,
      consEndDateTimeMax: null,
      indActive1ImpMin: null,
      indActive1ImpMax: null,
      indActive1T1ImpMin: null,
      indActive1T1ImpMax: null,
      indActive1T2ImpMin: null,
      indActive1T2ImpMax: null,
      indActive1T3ImpMin: null,
      indActive1T3ImpMax: null,
      indActive2ImpMin: null,
      indActive2ImpMax: null,
      indReactive1ImpMin: null,
      indReactive1ImpMax: null,
      indReactive1T1ImpMin: null,
      indReactive1T1ImpMax: null,
      indReactive1T2ImpMin: null,
      indReactive1T2ImpMax: null,
      indReactive1T3ImpMin: null,
      indReactive1T3ImpMax: null,
      indReactive2ImpMin: null,
      indReactive2ImpMax: null,
      indReactiveInd1ImpMin: null,
      indReactiveInd1ImpMax: null,
      indReactiveInd1T1ImpMin: null,
      indReactiveInd1T1ImpMax: null,
      indReactiveInd1T2ImpMin: null,
      indReactiveInd1T2ImpMax: null,
      indReactiveInd1T3ImpMin: null,
      indReactiveInd1T3ImpMax: null,
      indReactiveInd2ImpMin: null,
      indReactiveInd2ImpMax: null,
      indReactiveCap1ImpMin: null,
      indReactiveCap1ImpMax: null,
      indReactiveCap1T1ImpMin: null,
      indReactiveCap1T1ImpMax: null,
      indReactiveCap1T2ImpMin: null,
      indReactiveCap1T2ImpMax: null,
      indReactiveCap1T3ImpMin: null,
      indReactiveCap1T3ImpMax: null,
      indReactiveCap2ImpMin: null,
      indReactiveCap2ImpMax: null,
      indActive1ExpMin: null,
      indActive1ExpMax: null,
      indActive1T1ExpMin: null,
      indActive1T1ExpMax: null,
      indActive1T2ExpMin: null,
      indActive1T2ExpMax: null,
      indActive1T3ExpMin: null,
      indActive1T3ExpMax: null,
      indActive2ExpMin: null,
      indActive2ExpMax: null,
      indReactive1ExpMin: null,
      indReactive1ExpMax: null,
      indReactive1T1ExpMin: null,
      indReactive1T1ExpMax: null,
      indReactive1T2ExpMin: null,
      indReactive1T2ExpMax: null,
      indReactive1T3ExpMin: null,
      indReactive1T3ExpMax: null,
      indReactive2ExpMin: null,
      indReactive2ExpMax: null,
      indReactiveInd1ExpMin: null,
      indReactiveInd1ExpMax: null,
      indReactiveInd1T1ExpMin: null,
      indReactiveInd1T1ExpMax: null,
      indReactiveInd1T2ExpMin: null,
      indReactiveInd1T2ExpMax: null,
      indReactiveInd1T3ExpMin: null,
      indReactiveInd1T3ExpMax: null,
      indReactiveInd2ExpMin: null,
      indReactiveInd2ExpMax: null,
      indReactiveCap1ExpMin: null,
      indReactiveCap1ExpMax: null,
      indReactiveCap1T1ExpMin: null,
      indReactiveCap1T1ExpMax: null,
      indReactiveCap1T2ExpMin: null,
      indReactiveCap1T2ExpMax: null,
      indReactiveCap1T3ExpMin: null,
      indReactiveCap1T3ExpMax: null,
      indReactiveCap2ExpMin: null,
      indReactiveCap2ExpMax: null,
      deviceVoltTransValueMin: null,
      deviceVoltTransValueMax: null,
      deviceCurrTransValueMin: null,
      deviceCurrTransValueMax: null,
      capacitiveRateMin: null,
      capacitiveRateMax: null,
      inductiveRateMin: null,
      inductiveRateMax: null,
      calculationProfileIdMin: null,
      calculationProfileIdMax: null,
      calculationStateMin: null,
      calculationStateMax: null,
      calculationErrorCode: null,
      tzamMin: null,
      tzamMax: null,
      indActivePowImpMin: null,
      indActivePowImpMax: null,
      indActivePowExpMin: null,
      indActivePowExpMax: null,
    },
    type: 'post',
  });
}
export async function getDeviceElecInstantValueChartReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-elec-instant-values/instant-value-chart-list?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

export async function getDeviceElecHourlyConsumptionsReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/device-elec-hourly-consumptions/get-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: null,
      active: true,
      deviceIdMin: null,
      deviceIdMax: null,
      deviceSerialNrMin: null,
      deviceSerialNrMax: null,
      deviceDescription: null,
      deviceAccessPointIdMin: null,
      deviceAccessPointIdMax: null,
      deviceOrganizationIdMin: null,
      deviceOrganizationIdMax: null,
      deviceModelName: null,
      deviceModelCode: null,
      deviceOrganizationName: null,
      consStartDateTimeMin: null,
      consStartDateTimeMax: null,
      consEndDateTimeMin: null,
      consEndDateTimeMax: null,
      indActive1ImpMin: null,
      indActive1ImpMax: null,
      indActive1T1ImpMin: null,
      indActive1T1ImpMax: null,
      indActive1T2ImpMin: null,
      indActive1T2ImpMax: null,
      indActive1T3ImpMin: null,
      indActive1T3ImpMax: null,
      indActive2ImpMin: null,
      indActive2ImpMax: null,
      indReactive1ImpMin: null,
      indReactive1ImpMax: null,
      indReactive1T1ImpMin: null,
      indReactive1T1ImpMax: null,
      indReactive1T2ImpMin: null,
      indReactive1T2ImpMax: null,
      indReactive1T3ImpMin: null,
      indReactive1T3ImpMax: null,
      indReactive2ImpMin: null,
      indReactive2ImpMax: null,
      indReactiveInd1ImpMin: null,
      indReactiveInd1ImpMax: null,
      indReactiveInd1T1ImpMin: null,
      indReactiveInd1T1ImpMax: null,
      indReactiveInd1T2ImpMin: null,
      indReactiveInd1T2ImpMax: null,
      indReactiveInd1T3ImpMin: null,
      indReactiveInd1T3ImpMax: null,
      indReactiveInd2ImpMin: null,
      indReactiveInd2ImpMax: null,
      indReactiveCap1ImpMin: null,
      indReactiveCap1ImpMax: null,
      indReactiveCap1T1ImpMin: null,
      indReactiveCap1T1ImpMax: null,
      indReactiveCap1T2ImpMin: null,
      indReactiveCap1T2ImpMax: null,
      indReactiveCap1T3ImpMin: null,
      indReactiveCap1T3ImpMax: null,
      indReactiveCap2ImpMin: null,
      indReactiveCap2ImpMax: null,
      indActive1ExpMin: null,
      indActive1ExpMax: null,
      indActive1T1ExpMin: null,
      indActive1T1ExpMax: null,
      indActive1T2ExpMin: null,
      indActive1T2ExpMax: null,
      indActive1T3ExpMin: null,
      indActive1T3ExpMax: null,
      indActive2ExpMin: null,
      indActive2ExpMax: null,
      indReactive1ExpMin: null,
      indReactive1ExpMax: null,
      indReactive1T1ExpMin: null,
      indReactive1T1ExpMax: null,
      indReactive1T2ExpMin: null,
      indReactive1T2ExpMax: null,
      indReactive1T3ExpMin: null,
      indReactive1T3ExpMax: null,
      indReactive2ExpMin: null,
      indReactive2ExpMax: null,
      indReactiveInd1ExpMin: null,
      indReactiveInd1ExpMax: null,
      indReactiveInd1T1ExpMin: null,
      indReactiveInd1T1ExpMax: null,
      indReactiveInd1T2ExpMin: null,
      indReactiveInd1T2ExpMax: null,
      indReactiveInd1T3ExpMin: null,
      indReactiveInd1T3ExpMax: null,
      indReactiveInd2ExpMin: null,
      indReactiveInd2ExpMax: null,
      indReactiveCap1ExpMin: null,
      indReactiveCap1ExpMax: null,
      indReactiveCap1T1ExpMin: null,
      indReactiveCap1T1ExpMax: null,
      indReactiveCap1T2ExpMin: null,
      indReactiveCap1T2ExpMax: null,
      indReactiveCap1T3ExpMin: null,
      indReactiveCap1T3ExpMax: null,
      indReactiveCap2ExpMin: null,
      indReactiveCap2ExpMax: null,
      deviceVoltTransValueMin: null,
      deviceVoltTransValueMax: null,
      deviceCurrTransValueMin: null,
      deviceCurrTransValueMax: null,
      capacitiveRateMin: null,
      capacitiveRateMax: null,
      inductiveRateMin: null,
      inductiveRateMax: null,
      calculationProfileIdMin: null,
      calculationProfileIdMax: null,
      calculationStateMin: null,
      calculationStateMax: null,
      calculationErrorCode: null,
      tzamMin: null,
      tzamMax: null,
      indActivePowImpMin: null,
      indActivePowImpMax: null,
      indActivePowExpMin: null,
      indActivePowExpMax: null,
    },
    type: 'post',
  });
}

// weather reports
export async function getGetWeatherDataOWMSReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/weather-data-oWMS/get-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: null,
      temperatureMin: null,
      temperatureMax: null,
      humidityRatioMin: null,
      humidityRatioMax: null,
      pressureMin: null,
      pressureMax: null,
      sunriseDateTimeMin: null,
      sunriseDateTimeMax: null,
      sunsetDateTimeMin: null,
      sunsetDateTimeMax: null,
      cloudsRatioMin: null,
      cloudsRatioMax: null,
      windSpeedMin: null,
      windSpeedMax: null,
      windDirectionMin: null,
      windDirectionMax: null,
      visibilityMin: null,
      visibilityMax: null,
      weatherTypeMin: null,
      weatherTypeMax: null,
      locationName: null,
    },
    type: 'post',
  });
}
export async function getGetWeatherDataOWMSChartReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/weather-data-oWMS/weather-chart-list?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

export async function getSystemAlarmReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  if (dataParams?.sorting?.length > 0) {
    dataParams.sorting = dataParams?.sorting.join(',');
  } else {
    dataParams.sorting = '';
  }

  return await getFormDataPost({
    endPoint: `app/alarms/get-system-alarm-report?api-version=${apiVersion}`,
    formData: dataParams,
    type: 'post',
  });
}

export async function getEnergyIndexReportApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-energy-index-values/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: '',
      active: true,
    },
    type: 'post',
  });
}

export async function getTariffEnvironmentalPollutionsApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/tariff-environmental-pollutions/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: '',
      active: true,
    },
    type: 'post',
  });
}

export async function getDeviceElecStatusValuesApi({
  dataParams,
}: {
  dataParams: any;
}) {
  return await getFormDataPost({
    endPoint: `app/device-elec-status-values/report-list?api-version=${apiVersion}`,
    formData: {
      ...dataParams,
      filterText: '',
      active: true,
    },
    type: 'post',
  });
}
