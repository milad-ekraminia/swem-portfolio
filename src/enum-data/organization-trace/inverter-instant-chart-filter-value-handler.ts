export const inverterInstantChartFilterValueHandler = (value: string) => {
  switch (value) {
    case 'em_instant_voltage':
      return [
        'invACVoltPhase1',
        'invACVoltPhase2',
        'invACVoltPhase3',
        'invACVoltAvg',
      ];
    case 'em_instant_voltage_line_line':
      return [
        'invACVoltLL12',
        'invACVoltLL23',
        'invACVoltLL31',
        'invACVoltLLAvg',
      ];
    case 'em_instant_current':
      return [
        'invACCurPhase1',
        'invACCurPhase2',
        'invACCurPhase3',
        'invACCurTotal',
      ];
    case 'em_instant_active_power':
      return ['invACActPowerTotal'];
    case 'em_instant_reactive_power':
      return ['invACReactPowerTotal'];
    case 'em_instant_apperant_power':
      return ['invACApperantPowerTotal'];
    case 'em_instant_cos':
      return ['invACCosAvg'];
    case 'em_instant_power_factor':
      return ['invACPowerFactorAvg'];
    case 'em_instant_frequency':
      return ['invACFrequency'];
    case 'em_instant_dc_voltage':
      return [
        'invDCVoltPhase1',
        'invDCVoltPhase2',
        'invDCVoltPhase3',
        'invDCVoltPhase4',
      ];
    case 'em_instant_dc_current':
      return [
        'invDCCurrPhase1',
        'invDCCurrPhase2',
        'invDCCurrPhase3',
        'invDCCurrPhase4',
      ];
    case 'em_instant_dc_active_power':
      return ['invDCActPowerTotal'];
    default:
      return [];
  }
};

export const instantChartFilterValueHandler = (value: string) => {
  switch (value) {
    case 'em_instant_active_power':
      return [
        'insActPowerTotal',
        'insActPowerPhase1',
        'insActPowerPhase2',
        'insActPowerPhase3',
      ];
    case 'em_instant_apperant_power':
      return [
        'insApperantPowerTotal',
        'insApperantPowerPhase1',
        'insApperantPowerPhase2',
        'insApperantPowerPhase3',
      ];
    case 'em_instant_cos':
      return ['insCosAvg', 'insCosPhase1', 'insCosPhase2', 'insCosPhase3'];
    case 'em_instant_current':
      return [
        'insCurPhase1',
        'insCurPhase2',
        'insCurPhase3',
        'insCurTotal',
        'insCurNeutral',
      ];
    case 'em_instant_frequency':
      return [
        'insFrequencyPhase1',
        'insInsFrequencyPhase2',
        'insFrequencyPhase3',
      ];
    case 'em_instant_power_factor':
      return [
        'insPowerFactorAvg',
        'insPowerFactorPhase1',
        'insPowerFactorPhase2',
        'insPowerFactorPhase3',
      ];
    case 'em_instant_reactive_power':
      return [
        'insReactPowerTotal',
        'insReactPowerPhase1',
        'insReactPowerPhase2',
        'insReactPowerPhase3',
      ];
    case 'em_instant_thd_current':
      return [
        'insTHDCurrentTotal',
        'insTHDCurrentPhase1',
        'insTHDCurrentPhase2',
        'insTHDCurrentPhase3',
      ];
    case 'em_instant_thd_voltage':
      return [
        'insTHDVoltageTotal',
        'insTHDVoltagePhase1',
        'insTHDVoltagePhase2',
        'insTHDVoltagePhase3',
      ];
    case 'em_instant_voltage':
      return ['insVoltPhase1', 'insVoltPhase2', 'insVoltPhase3', 'insVoltAvg'];
    default:
      return ['insVoltLL12', 'insVoltLL23', 'insVoltLL31', 'insVoltLLAvg'];
  }
};
