import { describe, it, expect } from 'vitest';
import {
  getVisibleComponents,
  shouldShowProtocolSelect,
  shouldShowAccessPointCommLine,
  shouldShowAccessPointIp,
  shouldShowMqttConnectionProtocol,
  shouldShowSSLVersion,
  shouldShowAccessPointSerialNr,
  shouldShowAccessPointComPort,
  shouldShowAccessPointTimeout,
} from '@/helpers/definitions/visible-components-helper';

describe('definitions/visible-components-helper', () => {
  it('getVisibleComponents returns correct values for commType 1', () => {
    expect(getVisibleComponents({ accessPointCommType: 1, accessPointCommMethod: 1, accessPointProtocolId: 7 })).toBe(2);
    expect(getVisibleComponents({ accessPointCommType: 1, accessPointCommMethod: 1, accessPointProtocolId: 1 })).toBe(1);
    expect(getVisibleComponents({ accessPointCommType: 1, accessPointCommMethod: 2, accessPointProtocolId: 1 })).toBe(3);
    expect(getVisibleComponents({ accessPointCommType: 1, accessPointCommMethod: 3, accessPointProtocolId: 1 })).toBe(4);
    expect(getVisibleComponents({ accessPointCommType: 1, accessPointCommMethod: 99, accessPointProtocolId: 1 })).toBe(1);
  });

  it('getVisibleComponents returns correct values for commType 2', () => {
    expect(getVisibleComponents({ accessPointCommType: 2, accessPointCommMethod: 1, accessPointProtocolId: 1 })).toBe(5);
    expect(getVisibleComponents({ accessPointCommType: 2, accessPointCommMethod: 2, accessPointProtocolId: 1 })).toBe(6);
    expect(getVisibleComponents({ accessPointCommType: 2, accessPointCommMethod: 3, accessPointProtocolId: 1 })).toBe(7);
    expect(getVisibleComponents({ accessPointCommType: 2, accessPointCommMethod: 99, accessPointProtocolId: 1 })).toBe(1);
  });

  it('getVisibleComponents returns correct values for commType 3', () => {
    expect(getVisibleComponents({ accessPointCommType: 3, accessPointCommMethod: 1, accessPointProtocolId: 1 })).toBe(8);
    expect(getVisibleComponents({ accessPointCommType: 3, accessPointCommMethod: 2, accessPointProtocolId: 1 })).toBe(9);
    expect(getVisibleComponents({ accessPointCommType: 3, accessPointCommMethod: 3, accessPointProtocolId: 1 })).toBe(10);
    expect(getVisibleComponents({ accessPointCommType: 3, accessPointCommMethod: 99, accessPointProtocolId: 1 })).toBe(1);
  });

  it('getVisibleComponents returns correct values for commType 4', () => {
    expect(getVisibleComponents({ accessPointCommType: 4, accessPointCommMethod: 1, accessPointProtocolId: 1 })).toBe(12);
    expect(getVisibleComponents({ accessPointCommType: 4, accessPointCommMethod: 2, accessPointProtocolId: 1 })).toBe(13);
    expect(getVisibleComponents({ accessPointCommType: 4, accessPointCommMethod: 99, accessPointProtocolId: 1 })).toBe(11);
  });

  it('getVisibleComponents returns 1 for unknown commType', () => {
    expect(getVisibleComponents({ accessPointCommType: 99, accessPointCommMethod: 1, accessPointProtocolId: 1 })).toBe(1);
  });

  it('shouldShowProtocolSelect returns true for specific numbers', () => {
    expect(shouldShowProtocolSelect(1)).toBe(true);
    expect(shouldShowProtocolSelect(2)).toBe(true);
    expect(shouldShowProtocolSelect(5)).toBe(true);
    expect(shouldShowProtocolSelect(8)).toBe(true);
    expect(shouldShowProtocolSelect(3)).toBe(false);
  });

  it('shouldShowAccessPointCommLine returns true for specific numbers', () => {
    expect(shouldShowAccessPointCommLine(1)).toBe(true);
    expect(shouldShowAccessPointCommLine(3)).toBe(true);
    expect(shouldShowAccessPointCommLine(4)).toBe(true);
    expect(shouldShowAccessPointCommLine(5)).toBe(true);
    expect(shouldShowAccessPointCommLine(6)).toBe(true);
    expect(shouldShowAccessPointCommLine(7)).toBe(true);
    expect(shouldShowAccessPointCommLine(8)).toBe(true);
    expect(shouldShowAccessPointCommLine(9)).toBe(true);
    expect(shouldShowAccessPointCommLine(10)).toBe(true);
    expect(shouldShowAccessPointCommLine(2)).toBe(false);
  });

  it('shouldShowAccessPointIp returns true for specific numbers', () => {
    expect(shouldShowAccessPointIp(1)).toBe(true);
    expect(shouldShowAccessPointIp(3)).toBe(true);
    expect(shouldShowAccessPointIp(5)).toBe(true);
    expect(shouldShowAccessPointIp(6)).toBe(true);
    expect(shouldShowAccessPointIp(7)).toBe(true);
    expect(shouldShowAccessPointIp(11)).toBe(true);
    expect(shouldShowAccessPointIp(12)).toBe(true);
    expect(shouldShowAccessPointIp(13)).toBe(true);
    expect(shouldShowAccessPointIp(2)).toBe(false);
  });

  it('shouldShowMqttConnectionProtocol returns true for 11, 12, 13', () => {
    expect(shouldShowMqttConnectionProtocol(11)).toBe(true);
    expect(shouldShowMqttConnectionProtocol(12)).toBe(true);
    expect(shouldShowMqttConnectionProtocol(13)).toBe(true);
    expect(shouldShowMqttConnectionProtocol(1)).toBe(false);
  });

  it('shouldShowSSLVersion returns true for 12, 13', () => {
    expect(shouldShowSSLVersion(12)).toBe(true);
    expect(shouldShowSSLVersion(13)).toBe(true);
    expect(shouldShowSSLVersion(11)).toBe(false);
  });

  it('shouldShowAccessPointSerialNr returns true for 5, 6, 7', () => {
    expect(shouldShowAccessPointSerialNr(5)).toBe(true);
    expect(shouldShowAccessPointSerialNr(6)).toBe(true);
    expect(shouldShowAccessPointSerialNr(7)).toBe(true);
    expect(shouldShowAccessPointSerialNr(1)).toBe(false);
  });

  it('shouldShowAccessPointComPort returns true for 8, 9, 10', () => {
    expect(shouldShowAccessPointComPort(8)).toBe(true);
    expect(shouldShowAccessPointComPort(9)).toBe(true);
    expect(shouldShowAccessPointComPort(10)).toBe(true);
    expect(shouldShowAccessPointComPort(1)).toBe(false);
  });

  it('shouldShowAccessPointTimeout returns true for specific numbers', () => {
    expect(shouldShowAccessPointTimeout(1)).toBe(true);
    expect(shouldShowAccessPointTimeout(3)).toBe(true);
    expect(shouldShowAccessPointTimeout(4)).toBe(true);
    expect(shouldShowAccessPointTimeout(5)).toBe(true);
    expect(shouldShowAccessPointTimeout(6)).toBe(true);
    expect(shouldShowAccessPointTimeout(7)).toBe(true);
    expect(shouldShowAccessPointTimeout(8)).toBe(true);
    expect(shouldShowAccessPointTimeout(9)).toBe(true);
    expect(shouldShowAccessPointTimeout(10)).toBe(true);
    expect(shouldShowAccessPointTimeout(2)).toBe(false);
  });
});
