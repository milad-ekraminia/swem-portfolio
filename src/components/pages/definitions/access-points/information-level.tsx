import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Toggle from '@/components/ui/input/toggle-button/toggle';
import {
  accessPointCommLineEnumOptions,
  accessPointCommMethodEnumOptions,
  accessPointCommTypeEnumOptions,
  accessPointProtocolIdEnumOptions,
  mqttConnectionProtocolEnumOptions,
  mqttVersionEnumOptions,
  opcConnectionProtocolEnumOptions,
  opcMessageSecurityModeEnumOptions,
} from '@/enum-data/definitions/enum';
import {
  getVisibleComponents,
  shouldShowAccessPointCommLine,
  shouldShowAccessPointComPort,
  shouldShowAccessPointIp,
  shouldShowAccessPointSerialNr,
  shouldShowAccessPointTimeout,
  shouldShowMqttConnectionProtocol,
  shouldShowProtocolSelect,
  shouldShowSSLVersion,
} from '@/helpers/definitions/visible-components-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import MqttBrokerField from './mqtt-broker-field';

const MemoAccessPointFormContent = ({
  errors,
  register,
  control,
  setValue,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
}) => {
  const active = useWatch({
    control,
    name: 'active',
  });
  const accessPointCommType = Number(
    useWatch({
      control,
      name: 'accessPointCommType',
    }),
  );
  const accessPointCommMethod = Number(
    useWatch({
      control,
      name: 'accessPointCommMethod',
    }),
  );
  const accessPointProtocolId = Number(
    useWatch({
      control,
      name: 'accessPointProtocolId',
    }),
  );

  const accessPointLastConnTime = useWatch({
    control,
    name: 'accessPointLastConnTime',
  });
  const accessPointLastThreadUpd = useWatch({
    control,
    name: 'accessPointLastThreadUpd',
  });

  const accessPointLogFlag = useWatch({
    control,
    name: 'accessPointLogFlag',
  });

  const visibleComponentNumber = getVisibleComponents({
    accessPointCommType,
    accessPointCommMethod,
    accessPointProtocolId,
  });

  return (
    <div className="access-point-information-level">
      <Toggle
        isOn={active}
        setIsOn={() => {
          setValue('active', !active);
        }}
        label={getTranslatedValue('Active')}
      />
      <RegisterInput
        required
        type="text"
        name="accessPointName"
        label={getTranslatedValue('AccessPointName')}
        autoFocus={true}
        error={errors?.accessPointName?.message}
        maxLength={50}
        register={register}
      />
      <RegisterInput
        type="text"
        name="accessPointDescription"
        label={getTranslatedValue('AccessPointDescription')}
        error={errors?.accessPointDescription?.message}
        textarea={true}
        maxLength={100}
        register={register}
        className="col-span-2"
      />

      <div className="access-point-information-level__grid">
        <RegisterSelectInput
          name="accessPointCommType"
          label={getTranslatedValue('AccessPointCommType')}
          options={accessPointCommTypeEnumOptions}
          error={errors?.accessPointCommType?.message}
          isLoading={false}
          register={register}
          control={control}
        />
        <RegisterInput
          type="number"
          name="accessPointBackEndService"
          label={getTranslatedValue('AccessPointBackEndService')}
          error={errors?.accessPointBackEndService?.message}
          register={register}
        />

        <div className="method">
          {visibleComponentNumber !== 11 &&
            visibleComponentNumber !== 12 &&
            visibleComponentNumber !== 13 && (
              <RegisterSelectInput
                name="accessPointCommMethod"
                label={getTranslatedValue('AccessPointCommMethod')}
                options={accessPointCommMethodEnumOptions}
                error={errors?.accessPointCommMethod?.message}
                isLoading={false}
                register={register}
                mainClass="col-span-2"
                control={control}
              />
            )}

          {shouldShowProtocolSelect(visibleComponentNumber) && (
            <RegisterSelectInput
              name="accessPointProtocolId"
              label=""
              options={accessPointProtocolIdEnumOptions}
              error={errors?.accessPointProtocolId?.message}
              isLoading={false}
              register={register}
              control={control}
            />
          )}
        </div>

        {shouldShowAccessPointCommLine(visibleComponentNumber) && (
          <RegisterSelectInput
            name="accessPointCommLine"
            label={getTranslatedValue('AccessPointCommLine')}
            options={accessPointCommLineEnumOptions}
            error={errors?.accessPointCommLine?.message}
            isLoading={false}
            register={register}
            control={control}
          />
        )}

        {shouldShowAccessPointIp(visibleComponentNumber) && (
          <>
            <RegisterInput
              type="text"
              name="accessPointIp"
              label={getTranslatedValue('AccessPointIp')}
              error={errors?.accessPointIp?.message}
              register={register}
            />
            <RegisterInput
              type="number"
              name="accessPointPort"
              label={getTranslatedValue('AccessPointPort')}
              error={errors?.accessPointPort?.message}
              register={register}
            />
            <RegisterInput
              type="number"
              name="accessPointConfPort"
              label={getTranslatedValue('AccessPointConfPort')}
              error={errors?.accessPointConfPort?.message}
              register={register}
            />
          </>
        )}

        {shouldShowSSLVersion(visibleComponentNumber) && (
          <>
            <RegisterInput
              type="number"
              name="sslVersion"
              label={getTranslatedValue('SSLVersion')}
              error={errors?.sslVersion?.message}
              maxLength={20}
              register={register}
            />
            <RegisterInput
              type="text"
              name="caCertificate"
              label={getTranslatedValue('CACertificate')}
              error={errors?.caCertificate?.message}
              register={register}
            />
          </>
        )}

        {shouldShowAccessPointSerialNr(visibleComponentNumber) && (
          <RegisterInput
            type="number"
            name="accessPointSerialNr"
            label={getTranslatedValue('AccessPointSerialNr')}
            error={errors?.accessPointSerialNr?.message}
            maxLength={32}
            register={register}
          />
        )}

        {shouldShowAccessPointComPort(visibleComponentNumber) && (
          <RegisterInput
            type="text"
            name="accessPointComPort"
            label={getTranslatedValue('AccessPointComPort')}
            error={errors?.accessPointComPort?.message}
            maxLength={5}
            register={register}
          />
        )}

        {shouldShowAccessPointTimeout(visibleComponentNumber) && (
          <>
            <RegisterInput
              type="number"
              name="accessPointTimeout"
              label={getTranslatedValue('AccessPointTimeout')}
              error={errors?.accessPointTimeout?.message}
              register={register}
            />

            <RegisterInput
              type="number"
              name="accessPointQueryRetryCnt"
              label={getTranslatedValue('AccessPointQueryRetryCnt')}
              error={errors?.accessPointQueryRetryCnt?.message}
              register={register}
            />
          </>
        )}

        {Number(visibleComponentNumber) === 0 && (
          <>
            <DateInput
              label={getTranslatedValue('AccessPointLastConnTime')}
              // hasMax={true}
              name="accessPointLastConnTime"
              dateFormat={'DD/MM/YYYY HH:mm'}
              onChange={(value: any) =>
                setValue(accessPointLastConnTime, value)
              }
              value={accessPointLastConnTime}
              periodType={'1'}
              hasTime
            />
            <RegisterInput
              type="number"
              name="accessPointConnStatus"
              label={getTranslatedValue('AccessPointConnStatus')}
              error={errors?.accessPointConnStatus?.message}
              register={register}
            />
            <DateInput
              label={getTranslatedValue('AccessPointLastThreadUpd')}
              // hasMax={true}
              name="accessPointLastThreadUpd"
              dateFormat={'DD/MM/YYYY HH:mm'}
              onChange={(value: any) =>
                setValue(accessPointLastThreadUpd, value)
              }
              value={accessPointLastThreadUpd}
              periodType={'1'}
              hasTime
            />
            <RegisterInput
              type="text"
              name="opcUserName"
              label={getTranslatedValue('OpcUserName')}
              error={errors?.opcUserName?.message}
              maxLength={50}
              register={register}
            />
            <RegisterInput
              type="text"
              name="opcPassword"
              label={getTranslatedValue('OpcPassword')}
              error={errors?.opcPassword?.message}
              maxLength={50}
              register={register}
            />
          </>
        )}

        {Number(visibleComponentNumber) === 13 && (
          <>
            <RegisterInput
              type="text"
              name="certificate"
              label={getTranslatedValue('Certificate')}
              error={errors?.certificate?.message}
              register={register}
            />
            <RegisterInput
              type="text"
              name="privateKey"
              label={getTranslatedValue('PrivateKey')}
              error={errors?.privateKey?.message}
              register={register}
            />
          </>
        )}

        {Number(visibleComponentNumber) === 2 && (
          <>
            <RegisterInput
              type="text"
              name="opcConnectionUrl"
              label={getTranslatedValue('OpcConnectionUrl')}
              error={errors?.opcConnectionUrl?.message}
              register={register}
            />
            <RegisterSelectInput
              name="opcConnectionProtocol"
              label={getTranslatedValue('OpcConnectionProtocol')}
              options={opcConnectionProtocolEnumOptions}
              error={errors?.opcConnectionProtocol?.message}
              isLoading={false}
              register={register}
              control={control}
            />
            <RegisterInput
              type="number"
              name="opcNodeId"
              label={getTranslatedValue('OpcNodeId')}
              error={errors?.opcNodeId?.message}
              register={register}
            />
            <RegisterSelectInput
              name="opcMessageSecurityMode"
              label={getTranslatedValue('OpcMessageSecurityMode')}
              options={opcMessageSecurityModeEnumOptions}
              error={errors?.opcMessageSecurityMode?.message}
              isLoading={false}
              register={register}
              control={control}
            />
          </>
        )}

        {shouldShowMqttConnectionProtocol(visibleComponentNumber) && (
          <>
            <RegisterSelectInput
              name="mqttConnectionProtocol"
              label={getTranslatedValue('MqttConnectionProtocol')}
              options={mqttConnectionProtocolEnumOptions}
              error={errors?.mqttConnectionProtocol?.message}
              isLoading={false}
              register={register}
              control={control}
            />
            <RegisterSelectInput
              name="mqttVersion"
              label={getTranslatedValue('MqttVersion')}
              options={mqttVersionEnumOptions}
              error={errors?.mqttVersion?.message}
              isLoading={false}
              register={register}
              control={control}
            />
          </>
        )}
      </div>

      {shouldShowMqttConnectionProtocol(visibleComponentNumber) && (
        <>
          <h2 className="title">{getTranslatedValue('SubscriberInfo')}</h2>

          <RegisterInput
            type="text"
            name="subscriberUserName"
            label={getTranslatedValue('SubscriberUserName')}
            error={errors?.subscriberUserName?.message}
            maxLength={50}
            register={register}
          />
          <RegisterInput
            type="text"
            name="subscriberPassword"
            label={getTranslatedValue('SubscriberPassword')}
            error={errors?.subscriberPassword?.message}
            maxLength={50}
            register={register}
          />
          <RegisterInput
            type="text"
            name="subscriberClientId"
            label={getTranslatedValue('SubscriberClientId')}
            error={errors?.subscriberClientId?.message}
            maxLength={50}
            register={register}
          />

          <MqttBrokerField control={control} isLoading={false} />
        </>
      )}
      <Toggle
        isOn={accessPointLogFlag}
        setIsOn={() => {
          setValue('accessPointLogFlag', !accessPointLogFlag);
        }}
        label={getTranslatedValue('AccessPointLogFlag')}
      />
    </div>
  );
};

const AccessPointInformationLevel = memo(MemoAccessPointFormContent);

export default AccessPointInformationLevel;
